import { Client } from "@microsoft/microsoft-graph-client";
import { ConfidentialClientApplication } from "@azure/msal-node";

/**
 * Configura o cliente do Microsoft Graph API
 * Suporta tanto Client Credentials quanto token de usuário direto
 */
export function getMicrosoftGraphClient(userToken = null) {
  // Se um token de usuário foi fornecido, usar diretamente
  if (userToken) {
    return {
      getAccessToken: async () => userToken,
    };
  }

  // Caso contrário, usar Client Credentials
  const msalConfig = {
    auth: {
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
    },
  };

  const pca = new ConfidentialClientApplication(msalConfig);

  return {
    getAccessToken: async () => {
      const result = await pca.acquireTokenByClientCredential({
        scopes: ["https://graph.microsoft.com/.default"],
      });
      return result.accessToken;
    },
  };
}

/**
 * Busca todas as respostas de um formulário do Microsoft Forms
 * @param {string} formId - ID do formulário do Microsoft Forms
 * @param {string} userToken - (Opcional) Token de usuário para usar diretamente
 * @returns {Promise<Array>} Array de respostas
 */
export async function fetchMicrosoftFormResponses(formId, userToken = null) {
  try {
    const authClient = getMicrosoftGraphClient(userToken);
    const accessToken = await authClient.getAccessToken();

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    // Buscar informações do formulário
    const formInfo = await client
      .api(`/forms/${formId}`)
      .get();

    // Buscar respostas do formulário
    const responses = await client
      .api(`/forms/${formId}/responses`)
      .get();

    if (!responses.value || responses.value.length === 0) {
      return [];
    }

    // Mapear respostas para um formato mais útil
    const mappedResponses = responses.value.map((resp) => {
      const answers = {};
      
      // Processar cada resposta
      if (resp.answers) {
        Object.keys(resp.answers).forEach((questionId) => {
          const answer = resp.answers[questionId];
          const question = formInfo.questions?.find((q) => q.id === questionId);
          
          let value = null;
          
          if (answer.answer) {
            if (Array.isArray(answer.answer)) {
              value = answer.answer.join(", ");
            } else if (typeof answer.answer === "object") {
              value = JSON.stringify(answer.answer);
            } else {
              value = String(answer.answer);
            }
          } else if (answer.other) {
            value = answer.other;
          }

          const questionTitle = question?.title || questionId;
          answers[questionTitle] = value;
        });
      }

      return {
        responseId: resp.id,
        createTime: resp.submittedDateTime,
        lastSubmittedTime: resp.submittedDateTime,
        respondentEmail: resp.responder || null,
        answers: answers,
        rawData: resp,
      };
    });

    return mappedResponses;
  } catch (error) {
    console.error("Erro ao buscar respostas do Microsoft Forms:", error);
    throw new Error(`Erro ao buscar respostas: ${error.message}`);
  }
}

/**
 * Lista todos os formulários do Microsoft Forms do usuário
 * @param {string} userToken - (Opcional) Token de usuário para usar diretamente
 * @returns {Promise<Array>} Array de formulários
 */
export async function listMicrosoftForms(userToken = null) {
  try {
    const authClient = getMicrosoftGraphClient(userToken);
    const accessToken = await authClient.getAccessToken();

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    // Buscar formulários do usuário
    const response = await client
      .api("/me/insights/used")
      .filter("resourceVisualization/type eq 'Form'")
      .get();

    // Alternativa: buscar formulários do OneDrive/SharePoint
    // Nota: Microsoft Forms não tem endpoint direto para listar todos os formulários
    // Esta é uma abordagem alternativa usando insights
    
    const forms = response.value || [];
    
    return forms.map((form) => ({
      id: form.id,
      name: form.resourceVisualization?.title || "Formulário sem nome",
      createdTime: form.lastUsed?.lastAccessedDateTime,
      modifiedTime: form.lastUsed?.lastAccessedDateTime,
    }));
  } catch (error) {
    console.error("Erro ao listar formulários do Microsoft Forms:", error);
    // Se falhar, retornar array vazio (Microsoft Forms API é limitada)
    return [];
  }
}

/**
 * Método alternativo: buscar formulário por ID diretamente
 * @param {string} formId - ID do formulário
 * @param {string} userToken - (Opcional) Token de usuário para usar diretamente
 * @returns {Promise<Object>} Informações do formulário
 */
export async function getMicrosoftFormById(formId, userToken = null) {
  try {
    const authClient = getMicrosoftGraphClient(userToken);
    const accessToken = await authClient.getAccessToken();

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    const form = await client
      .api(`/forms/${formId}`)
      .get();

    return {
      id: form.id,
      name: form.displayName || "Formulário sem nome",
      createdTime: form.createdDateTime,
      modifiedTime: form.lastModifiedDateTime,
    };
  } catch (error) {
    console.error("Erro ao buscar formulário:", error);
    throw new Error(`Erro ao buscar formulário: ${error.message}`);
  }
}

