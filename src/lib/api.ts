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

// ===== AUTH =====
export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Erro desconhecido" }));
      throw new Error(error.error || `Erro: ${response.status}`);
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Erro desconhecido" }));
      throw new Error(error.error || `Erro: ${response.status}`);
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!getToken();
  },
};

// ===== DATA =====
export const dataAPI = {
  // Scores
  getScores: () => fetchWithAuth("/data/scores"),
  updateScores: (scores: any) =>
    fetchWithAuth("/data/scores", {
      method: "PUT",
      body: JSON.stringify(scores),
    }),
  resetScores: () => fetchWithAuth("/data/scores/reset", { method: "POST" }),

  // Time Records
  getTimes: () => fetchWithAuth("/data/times"),
  createTime: (timeRecord: any) =>
    fetchWithAuth("/data/times", {
      method: "POST",
      body: JSON.stringify(timeRecord),
    }),
  deleteTime: (id: string) =>
    fetchWithAuth(`/data/times/${id}`, { method: "DELETE" }),

  // Sessions
  getSessions: () => fetchWithAuth("/data/sessions"),
  createSession: (session: any) =>
    fetchWithAuth("/data/sessions", {
      method: "POST",
      body: JSON.stringify(session),
    }),
  deleteSession: (id: string) =>
    fetchWithAuth(`/data/sessions/${id}`, { method: "DELETE" }),
};

