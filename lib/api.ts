// API client for backend communication
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
  // Teams
  teams: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/teams`);
      return res.json();
    },
    getById: async (id: string) => {
      const res = await fetch(`${API_URL}/teams/${id}`);
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_URL}/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await fetch(`${API_URL}/teams/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.json();
    },
    delete: async (id: string) => {
      const res = await fetch(`${API_URL}/teams/${id}`, {
        method: 'DELETE'
      });
      return res.json();
    },
    deleteAll: async () => {
      const res = await fetch(`${API_URL}/teams`, {
        method: 'DELETE'
      });
      return res.json();
    }
  },

  // Tournaments
  tournaments: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/tournaments`);
      return res.json();
    },
    getActive: async () => {
      const res = await fetch(`${API_URL}/tournaments/active`);
      return res.json();
    },
    getById: async (id: string) => {
      const res = await fetch(`${API_URL}/tournaments/${id}`);
      return res.json();
    },
    start: async () => {
      const res = await fetch(`${API_URL}/tournaments/start`, {
        method: 'POST'
      });
      return res.json();
    },
    reset: async () => {
      const res = await fetch(`${API_URL}/tournaments/reset`, {
        method: 'POST'
      });
      return res.json();
    }
  },

  // Matches
  matches: {
    getAll: async (params?: { tournamentId?: string; stage?: string }) => {
      const query = new URLSearchParams(params as any).toString();
      const res = await fetch(`${API_URL}/matches${query ? `?${query}` : ''}`);
      return res.json();
    },
    getById: async (id: string) => {
      const res = await fetch(`${API_URL}/matches/${id}`);
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await fetch(`${API_URL}/matches/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.json();
    }
  },

  // Analytics
  analytics: {
    getHistory: async () => {
      const res = await fetch(`${API_URL}/analytics/history`);
      return res.json();
    },
    getTeamAnalytics: async (teamName: string) => {
      const res = await fetch(`${API_URL}/analytics/teams/${teamName}`);
      return res.json();
    },
    getAllTeamAnalytics: async () => {
      const res = await fetch(`${API_URL}/analytics/teams`);
      return res.json();
    },
    archive: async (data: any) => {
      const res = await fetch(`${API_URL}/analytics/archive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return res.json();
    }
  }
};
