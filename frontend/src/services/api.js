import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' });

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Utility to set the authorization header
const getAuthHeaders = (token) => ({
  headers: { 
    // Backend expects the token in the format: "Bearer <token>"
    token: `Bearer ${token}` 
  }
});

// Auth routes
export const login = (formData) => API.post('/v1/auth/login', formData);
export const register = (formData) => API.post('/v1/auth/register', formData);

// Task routes (using plural /tasks to match backend)
export const getTasks = (token) => API.get('/v1/tasks', getAuthHeaders(token));
export const createTask = (taskData, token) => API.post('/v1/tasks', taskData, getAuthHeaders(token));
export const updateTask = (id, taskData, token) => API.put(`/v1/tasks/${id}`, taskData, getAuthHeaders(token));
export const deleteTask = (id, token) => API.delete(`/v1/tasks/${id}`, getAuthHeaders(token));

export default API;
