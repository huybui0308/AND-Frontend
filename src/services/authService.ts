import api from './api';
import { LoginRequest, LoginResponse, SignupRequest, User } from '../types';

// Mock test accounts
const MOCK_ACCOUNTS = {
  teacher: {
    username: 'teacher',
    password: 'teacher123',
    user: {
      id: 1,
      username: 'teacher',
      teamName: 'Instructors',
      role: 'TEACHER' as const,
    },
    token: 'mock-teacher-token-12345',
  },
  student: {
    username: 'student',
    password: 'student123',
    user: {
      id: 2,
      username: 'student',
      teamName: 'Alpha Team',
      role: 'TEAM' as const,
    },
    token: 'mock-student-token-67890',
  },
  admin: {
    username: 'admin',
    password: 'admin123',
    user: {
      id: 3,
      username: 'admin',
      teamName: 'Administrators',
      role: 'ADMIN' as const,
    },
    token: 'mock-admin-token-54321',
  },
};

// Check if using mock authentication (demo mode)
const isMockAuth = (username: string, password: string): boolean => {
  return Object.values(MOCK_ACCOUNTS).some(
    (account) => account.username === username && account.password === password
  );
};

// Get mock account by credentials
const getMockAccount = (username: string, password: string) => {
  return Object.values(MOCK_ACCOUNTS).find(
    (account) => account.username === username && account.password === password
  );
};

export const authService = {
  // Login (with mock support)
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Check if using mock credentials
    if (isMockAuth(credentials.username, credentials.password)) {
      const mockAccount = getMockAccount(credentials.username, credentials.password);
      if (mockAccount) {
        // Mark as demo mode
        localStorage.setItem('demoMode', 'true');
        return {
          token: mockAccount.token,
          type: 'Bearer',
          id: mockAccount.user.id,
          username: mockAccount.user.username,
          teamName: mockAccount.user.teamName,
          roles: [mockAccount.user.role],
        };
      }
    }

    // Otherwise use real API
    localStorage.removeItem('demoMode');
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
    // If in demo mode, return user from localStorage
    if (localStorage.getItem('demoMode') === 'true') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }
    }

    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('demoMode');
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

  // Check if in demo mode
  isDemoMode: (): boolean => {
    return localStorage.getItem('demoMode') === 'true';
  },
};
