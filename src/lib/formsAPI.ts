const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Função para obter o token do localStorage
const getToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

// Função para fazer requisições autenticadas
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Erro desconhecido" }));
    throw new Error(error.error || `Erro: ${response.status}`);
  }

  return response.json();
};

// ===== GOOGLE FORMS API =====
export const formsAPI = {
  /**
   * Lista todos os formulários disponíveis
   */
  listForms: async () => {
    return fetchWithAuth("/forms");
  },

  /**
   * Busca respostas de um formulário (sem salvar no banco)
   */
  getFormResponses: async (formId: string) => {
    return fetchWithAuth(`/forms/${formId}/responses`);
  },

  /**
   * Sincroniza respostas do Forms e salva no banco
   */
  syncForm: async (formId: string) => {
    return fetchWithAuth(`/forms/${formId}/sync`, {
      method: "POST",
    });
  },

  /**
   * Lista todas as respostas sincronizadas
   */
  getSyncedResponses: async (formId?: string, limit = 50, skip = 0) => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    });
    if (formId) {
      params.append("formId", formId);
    }
    return fetchWithAuth(`/forms/responses/all?${params}`);
  },

  /**
   * Remove uma resposta sincronizada
   */
  deleteResponse: async (responseId: string) => {
    return fetchWithAuth(`/forms/responses/${responseId}`, {
      method: "DELETE",
    });
  },
};

