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
   * @param source - "google" | "microsoft" | undefined (todos)
   */
  listForms: async (source?: "google" | "microsoft") => {
    const params = source ? `?source=${source}` : "";
    return fetchWithAuth(`/forms${params}`);
  },

  /**
   * Busca respostas de um formulário (sem salvar no banco)
   * @param formId - ID do formulário
   * @param source - "google" | "microsoft" (padrão: "google")
   */
  getFormResponses: async (formId: string, source: "google" | "microsoft" = "google") => {
    return fetchWithAuth(`/forms/${formId}/responses?source=${source}`);
  },

  /**
   * Sincroniza respostas do Forms e salva no banco
   * @param formId - ID do formulário
   * @param source - "google" | "microsoft" (padrão: "google")
   */
  syncForm: async (formId: string, source: "google" | "microsoft" = "google") => {
    return fetchWithAuth(`/forms/${formId}/sync`, {
      method: "POST",
      body: JSON.stringify({ source }),
    });
  },

  /**
   * Lista todas as respostas sincronizadas
   * @param formId - ID do formulário (opcional)
   * @param source - "google" | "microsoft" (opcional)
   * @param limit - Limite de resultados
   * @param skip - Quantidade para pular
   */
  getSyncedResponses: async (formId?: string, source?: "google" | "microsoft", limit = 50, skip = 0) => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    });
    if (formId) {
      params.append("formId", formId);
    }
    if (source) {
      params.append("source", source);
    }
    return fetchWithAuth(`/forms/responses/all?${params}`);
  },

  /**
   * Lista todas as pastas compartilhadas
   */
  listFolders: async () => {
    return fetchWithAuth("/forms/folders");
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

