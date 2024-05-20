// axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your actual API base URL
  withCredentials: true, // Include credentials in requests if needed
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
