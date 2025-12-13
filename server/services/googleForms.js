import { google } from "googleapis";

/**
 * Configura o cliente do Google Forms API
 */
export function getGoogleFormsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      project_id: process.env.GOOGLE_PROJECT_ID,
    },
    scopes: [
      "https://www.googleapis.com/auth/forms.body.readonly",
      "https://www.googleapis.com/auth/forms.responses.readonly",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });

  return google.forms({ version: "v1", auth });
}

/**
 * Busca todas as respostas de um formulário
 * @param {string} formId - ID do formulário do Google Forms
 * @returns {Promise<Array>} Array de respostas
 */
export async function fetchFormResponses(formId) {
  try {
    const forms = getGoogleFormsClient();
    
    // Buscar respostas do formulário
    const response = await forms.forms.responses.list({
      formId: formId,
    });

    if (!response.data.responses) {
      return [];
    }

    // Buscar informações do formulário para mapear perguntas
    const formInfo = await forms.forms.get({ formId: formId });
    const questions = formInfo.data.items || [];

    // Mapear respostas para um formato mais útil
    const mappedResponses = response.data.responses.map((resp) => {
      const answers = {};
      
      // Processar cada resposta
      if (resp.answers) {
        Object.keys(resp.answers).forEach((questionId) => {
          const answer = resp.answers[questionId];
          const question = questions.find((q) => q.questionItem?.question?.questionId === questionId);
          
          let value = null;
          
          if (answer.textAnswers) {
            value = answer.textAnswers.answers.map((a) => a.value).join(", ");
          } else if (answer.choiceAnswers) {
            value = answer.choiceAnswers.answers.map((a) => a.value || a.other).join(", ");
          } else if (answer.fileUploadAnswers) {
            value = answer.fileUploadAnswers.answers.map((a) => a.fileId).join(", ");
          } else if (answer.scaleAnswers) {
            value = answer.scaleAnswers.answers.map((a) => a.value).join(", ");
          } else if (answer.dateAnswers) {
            value = answer.dateAnswers.answers.map((a) => `${a.value.year}-${a.value.month}-${a.value.day}`).join(", ");
          } else if (answer.timeAnswers) {
            value = answer.timeAnswers.answers.map((a) => `${a.value.hours}:${a.value.minutes}`).join(", ");
          }

          const questionTitle = question?.title || questionId;
          answers[questionTitle] = value;
        });
      }

      return {
        responseId: resp.responseId,
        createTime: resp.createTime,
        lastSubmittedTime: resp.lastSubmittedTime,
        respondentEmail: resp.respondentEmail || null,
        answers: answers,
        rawData: resp,
      };
    });

    return mappedResponses;
  } catch (error) {
    console.error("Erro ao buscar respostas do Forms:", error);
    throw new Error(`Erro ao buscar respostas: ${error.message}`);
  }
}

/**
 * Lista todos os formulários do usuário
 * @returns {Promise<Array>} Array de formulários
 */
export async function listForms() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        project_id: process.env.GOOGLE_PROJECT_ID,
      },
      scopes: [
        "https://www.googleapis.com/auth/drive.readonly",
      ],
    });

    const drive = google.drive({ version: "v3", auth });
    
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.form'",
      fields: "files(id, name, createdTime, modifiedTime)",
      orderBy: "modifiedTime desc",
    });

    return response.data.files || [];
  } catch (error) {
    console.error("Erro ao listar formulários:", error);
    throw new Error(`Erro ao listar formulários: ${error.message}`);
  }
}

