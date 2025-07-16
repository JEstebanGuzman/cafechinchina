import axios from 'axios';

const api = axios.create({
  // During development, the Vite proxy will handle this.
  // For production, you might need to set VITE_API_BASE_URL in your Netlify environment.
  baseURL: (import.meta as any).env.VITE_API_BASE_URL || '/api',
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
