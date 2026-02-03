// Utility functions for authentication

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
