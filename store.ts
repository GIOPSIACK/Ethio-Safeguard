
import axios from 'axios';
import { User, AidRequest, Notification } from './types';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const store = {
  login: async (email: string, password: string): Promise<User> => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  getUsers: async (): Promise<User[]> => {
    const { data } = await axios.get('/api/users');
    return data;
  },

  updateUserStatus: async (userId: string, status: string): Promise<User> => {
    const { data } = await axios.put(`/api/users/${userId}/approve`, { status });
    return data;
  },

  getRequests: async (): Promise<AidRequest[]> => {
    const { data } = await axios.get('/api/aid-requests');
    return data;
  },

  createRequest: async (request: Partial<AidRequest>): Promise<AidRequest> => {
    const { data } = await axios.post('/api/aid-requests', request);
    return data;
  },

  updateRequestStatus: async (requestId: string, status: string): Promise<AidRequest> => {
    const { data } = await axios.put(`/api/aid-requests/${requestId}/status`, { status });
    return data;
  },

  getNotifications: async (): Promise<Notification[]> => {
    const { data } = await axios.get('/api/notifications');
    return data;
  },

  createNotification: async (notification: Partial<Notification>): Promise<Notification> => {
    const { data } = await axios.post('/api/notifications', notification);
    return data;
  },
};
