import express from "express";
import { authenticate } from "../middleware/auth.js";
import { FormResponse } from "../models/FormResponse.js";
import { fetchFormResponses, listForms } from "../services/googleForms.js";

const router = express.Router();

/**
 * GET /api/forms
 * Lista todos os formulários disponíveis
 */
router.get("/", authenticate, async (req, res) => {
  try {
    const forms = await listForms();
    res.json({ success: true, forms });
  } catch (error) {
    console.error("Erro ao listar formulários:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Erro ao listar formulários" 
    });
  }
});

/**
 * GET /api/forms/:formId/responses
 * Busca respostas de um formulário específico
 */
router.get("/:formId/responses", authenticate, async (req, res) => {
  try {
    const { formId } = req.params;
    const responses = await fetchFormResponses(formId);
    
    res.json({ 
      success: true, 
      count: responses.length,
      responses 
    });
  } catch (error) {
    console.error("Erro ao buscar respostas:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Erro ao buscar respostas" 
    });
  }
});

/**
 * POST /api/forms/:formId/sync
 * Sincroniza respostas do Forms e salva no banco
 */
router.post("/:formId/sync", authenticate, async (req, res) => {
  try {
    const { formId } = req.params;
    const userId = req.user.id;

    // Buscar respostas do Forms
    const responses = await fetchFormResponses(formId);

    if (!responses || responses.length === 0) {
      return res.json({ 
        success: true, 
        message: "Nenhuma resposta encontrada",
        synced: 0 
      });
    }

    // Salvar cada resposta no banco
    let synced = 0;
    let skipped = 0;

    for (const response of responses) {
      try {
        // Verificar se já existe
        const existing = await FormResponse.findOne({ 
          responseId: response.responseId 
        });

        if (existing) {
          skipped++;
          continue;
        }

        // Criar nova resposta
        await FormResponse.create({
          formId: formId,
          responseId: response.responseId,
          timestamp: new Date(response.createTime || response.lastSubmittedTime),
          respondentEmail: response.respondentEmail,
          answers: response.answers,
          rawData: response.rawData,
          userId: userId,
        });

        synced++;
      } catch (err) {
        console.error(`Erro ao salvar resposta ${response.responseId}:`, err);
      }
    }

    res.json({ 
      success: true, 
      message: `Sincronização concluída`,
      synced,
      skipped,
      total: responses.length
    });
  } catch (error) {
    console.error("Erro ao sincronizar formulário:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Erro ao sincronizar formulário" 
    });
  }
});

/**
 * GET /api/forms/responses
 * Lista todas as respostas sincronizadas do usuário
 */
router.get("/responses/all", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const { formId, limit = 50, skip = 0 } = req.query;

    const query = { userId };
    if (formId) {
      query.formId = formId;
    }

    const responses = await FormResponse.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .lean();

    const total = await FormResponse.countDocuments(query);

    res.json({ 
      success: true, 
      responses,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip)
    });
  } catch (error) {
    console.error("Erro ao buscar respostas sincronizadas:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Erro ao buscar respostas" 
    });
  }
});

/**
 * DELETE /api/forms/responses/:responseId
 * Remove uma resposta sincronizada
 */
router.delete("/responses/:responseId", authenticate, async (req, res) => {
  try {
    const { responseId } = req.params;
    const userId = req.user.id;

    const response = await FormResponse.findOneAndDelete({ 
      responseId,
      userId 
    });

    if (!response) {
      return res.status(404).json({ 
        success: false, 
        error: "Resposta não encontrada" 
      });
    }

    res.json({ 
      success: true, 
      message: "Resposta removida com sucesso" 
    });
  } catch (error) {
    console.error("Erro ao remover resposta:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Erro ao remover resposta" 
    });
  }
});

export default router;

