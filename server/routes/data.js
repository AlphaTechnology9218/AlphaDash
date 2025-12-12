import express from "express";
import { ScoreData } from "../models/ScoreData.js";
import { Session } from "../models/Session.js";
import { TimeRecord } from "../models/TimeRecord.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// ===== SCORES =====
// Obter scores do usuário
router.get("/scores", async (req, res) => {
  try {
    let scoreData = await ScoreData.findOne({ userId: req.user._id });

    if (!scoreData) {
      // Criar scores padrão se não existir
      scoreData = new ScoreData({
        userId: req.user._id,
        expressoEcologico1: 0,
        expressoEcologico2: 0,
        expressoEcologico3: 0,
        expressoEcologico4: 0,
        bonificacaoExpresso: 0,
        reflorestamentoAzul: 0,
        reflorestamentoVerde: 0,
        departamentoEcologico: 0,
      });
      await scoreData.save();
    }

    res.json(scoreData);
  } catch (error) {
    console.error("Erro ao obter scores:", error);
    res.status(500).json({ error: "Erro ao obter scores" });
  }
});

// Atualizar scores
router.put("/scores", async (req, res) => {
  try {
    const scores = req.body;
    const scoreData = await ScoreData.findOneAndUpdate(
      { userId: req.user._id },
      { $set: scores },
      { new: true, upsert: true }
    );

    res.json(scoreData);
  } catch (error) {
    console.error("Erro ao atualizar scores:", error);
    res.status(500).json({ error: "Erro ao atualizar scores" });
  }
});

// Resetar scores
router.post("/scores/reset", async (req, res) => {
  try {
    const scoreData = await ScoreData.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          expressoEcologico1: 0,
          expressoEcologico2: 0,
          expressoEcologico3: 0,
          expressoEcologico4: 0,
          bonificacaoExpresso: 0,
          reflorestamentoAzul: 0,
          reflorestamentoVerde: 0,
          departamentoEcologico: 0,
        },
      },
      { new: true, upsert: true }
    );

    res.json(scoreData);
  } catch (error) {
    console.error("Erro ao resetar scores:", error);
    res.status(500).json({ error: "Erro ao resetar scores" });
  }
});

// ===== TIME RECORDS =====
// Obter todos os time records
router.get("/times", async (req, res) => {
  try {
    const times = await TimeRecord.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.json(times);
  } catch (error) {
    console.error("Erro ao obter times:", error);
    res.status(500).json({ error: "Erro ao obter times" });
  }
});

// Criar time record
router.post("/times", async (req, res) => {
  try {
    const timeRecord = new TimeRecord({
      ...req.body,
      userId: req.user._id,
    });
    await timeRecord.save();

    res.status(201).json(timeRecord);
  } catch (error) {
    console.error("Erro ao criar time record:", error);
    res.status(500).json({ error: "Erro ao criar time record" });
  }
});

// Deletar time record
router.delete("/times/:id", async (req, res) => {
  try {
    const result = await TimeRecord.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!result) {
      return res.status(404).json({ error: "Time record não encontrado" });
    }

    res.json({ message: "Time record deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar time record:", error);
    res.status(500).json({ error: "Erro ao deletar time record" });
  }
});

// ===== SESSIONS =====
// Obter todas as sessões
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.json(sessions);
  } catch (error) {
    console.error("Erro ao obter sessions:", error);
    res.status(500).json({ error: "Erro ao obter sessions" });
  }
});

// Criar sessão
router.post("/sessions", async (req, res) => {
  try {
    const session = new Session({
      ...req.body,
      userId: req.user._id,
    });
    await session.save();

    res.status(201).json(session);
  } catch (error) {
    console.error("Erro ao criar session:", error);
    res.status(500).json({ error: "Erro ao criar session" });
  }
});

// Deletar sessão
router.delete("/sessions/:id", async (req, res) => {
  try {
    const result = await Session.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!result) {
      return res.status(404).json({ error: "Sessão não encontrada" });
    }

    res.json({ message: "Sessão deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar session:", error);
    res.status(500).json({ error: "Erro ao deletar session" });
  }
});

export default router;

