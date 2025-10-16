import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
};

export const progressService = {
  getTopicsBySection: (section) => api.get(`/topics/${encodeURIComponent(section)}`),
  markTopicComplete: (userId, topicId) => api.post(`/progress/${userId}/${topicId}`),
  getProgress: (userId) => api.get(`/progress/${userId}`),
  getDailyProgress: (userId) => api.get(`/daily/${userId}`),
  getUserByEmail: (email) => api.get(`/user/email/${email}`),
};

export const topicService = {
  addTopic: (name, section, description) => api.post('/topics/add', { name, section, description }),
  addBulkTopics: (section, topics) => api.post('/topics/bulk-add', { section, topics }),
};