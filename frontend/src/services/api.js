import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

export const getTasks = (token) => api.get('/tasks', { headers: { token: `Bearer ${token}` } });
export const createTask = (taskData, token) => api.post('/tasks', taskData, { headers: { token: `Bearer ${token}` } });
export const updateTask = (id, taskData, token) => api.put(`/tasks/${id}`, taskData, { headers: { token: `Bearer ${token}` } });
export const deleteTask = (id, token) => api.delete(`/tasks/${id}`, { headers: { token: `Bearer ${token}` } });
