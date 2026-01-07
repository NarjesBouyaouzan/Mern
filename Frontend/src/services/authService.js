import api from './api.js';

// Register user
export const registerUser = (data) => {
  return api.post('/auth/register', data);
};

// Login user
export const loginUser = (data) => {
  return api.post('/auth/login', data);
};

// Get current user
export const getMe = () => {
  return api.get('/auth/me');
};
