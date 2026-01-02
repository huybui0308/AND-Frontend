import api from './api';
import { LoginRequest, LoginResponse, SignupRequest, User } from '../types';

export const authService = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  // Signup (Team Registration)
  signup: async (data: SignupRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/signup', data);
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Save token
  saveToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  // Save user
  saveUser: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Get stored user
  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};
