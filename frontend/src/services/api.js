import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  register: (username, email, password) => api.post('/auth/register', { username, email, password }),
};

export const progressService = {
  getTopicsBySection: (section) => api.get(`/topics/${section}`),
  markTopicComplete: (userId, topicId) => api.post(`/progress/${userId}/${topicId}`),
  getProgress: (userId) => api.get(`/progress/${userId}`),
  getDailyProgress: (userId) => api.get(`/daily/${userId}`),
  getUserByUsername: (username) => api.get(`/user/${username}`),
};