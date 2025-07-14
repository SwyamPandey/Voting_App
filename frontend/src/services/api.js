import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (userData) => api.post('/user/signup', userData),
  login: (credentials) => api.post('/user/login', credentials),
  getProfile: () => api.get('/user/profile'),
  updatePassword: (passwordData) => api.put('/user/profile/password', passwordData),
};

export const candidateAPI = {
  getCandidates: () => api.get('/candidate'),
  addCandidate: (candidateData) => api.post('/candidate', candidateData),
  updateCandidate: (id, candidateData) => api.put(`/candidate/${id}`, candidateData),
  deleteCandidate: (id) => api.delete(`/candidate/${id}`),
  vote: (candidateId) => api.post(`/candidate/vote/${candidateId}`),
  getVoteCount: () => api.get('/candidate/vote/count'),
};

export default api;
