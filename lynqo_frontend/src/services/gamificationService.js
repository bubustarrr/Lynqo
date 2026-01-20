export const gamificationService = {
    getStats: async (userId) => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/gamification/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
    completeDailyGoal: async (userId) => {
      // POST to claim daily reward
    }
  };
  