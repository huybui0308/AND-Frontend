import { create } from 'zustand';
import { User, LoginRequest, SignupRequest } from '../types';
import { authService } from '../services/authService';
import { toast } from 'sonner';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: authService.getStoredUser(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,

  login: async (credentials: LoginRequest) => {
    set({ isLoading: true });
    try {
      const response = await authService.login(credentials);
      
      // Extract role from roles array
      const role = response.roles[0] as User['role'];
      
      const user: User = {
        id: response.id,
        username: response.username,
        teamName: response.teamName,
        role,
        token: response.token,
      };

      authService.saveToken(response.token);
      authService.saveUser(user);
      
      set({ user, isAuthenticated: true, isLoading: false });
      toast.success('Login successful!');
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  },

  signup: async (data: SignupRequest) => {
    set({ isLoading: true });
    try {
      const response = await authService.signup(data);
      
      // Extract role from roles array
      const role = response.roles[0] as User['role'];
      
      const user: User = {
        id: response.id,
        username: response.username,
        teamName: response.teamName,
        role,
        token: response.token,
      };

      authService.saveToken(response.token);
      authService.saveUser(user);
      
      set({ user, isAuthenticated: true, isLoading: false });
      toast.success('Signup successful!');
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
    toast.success('Logged out successfully');
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    try {
      const user = await authService.getMe();
      authService.saveUser(user);
      set({ user, isAuthenticated: true });
    } catch {
      authService.logout();
      set({ user: null, isAuthenticated: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
    if (user) {
      authService.saveUser(user);
    }
  },
}));
