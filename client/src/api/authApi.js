import axios from './axios';

export const login = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post('/auth/register', userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await axios.get('/auth/profile');
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await axios.put('/auth/profile', userData);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get('/auth/users');
  return response.data.data;
};
