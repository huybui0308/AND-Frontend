import { create } from 'zustand';
import { Game, UploadResponse } from '../types';
import { gameService } from '../services/gameService';
import toast from 'react-hot-toast';

interface GameState {
  game: Game | null;
  isLoading: boolean;
  
  // Actions
  fetchStatus: () => Promise<void>;
  startGame: () => Promise<void>;
  stopGame: () => Promise<void>;
  uploadChecker: (file: File) => Promise<UploadResponse>;
  uploadVulnbox: (file: File) => Promise<UploadResponse>;
}

export const useGameStore = create<GameState>((set) => ({
  game: null,
  isLoading: false,

  fetchStatus: async () => {
    set({ isLoading: true });
    try {
      const game = await gameService.getStatus();
      set({ game, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      // Don't show error toast for status check failures
      throw error;
    }
  },

  startGame: async () => {
    set({ isLoading: true });
    try {
      const game = await gameService.start();
      set({ game, isLoading: false });
      toast.success('Game started successfully!');
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Failed to start game';
      toast.error(message);
      throw error;
    }
  },

  stopGame: async () => {
    set({ isLoading: true });
    try {
      const game = await gameService.stop();
      set({ game, isLoading: false });
      toast.success('Game stopped successfully!');
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Failed to stop game';
      toast.error(message);
      throw error;
    }
  },

  uploadChecker: async (file: File) => {
    set({ isLoading: true });
    try {
      const response = await gameService.uploadChecker(file);
      set({ isLoading: false });
      toast.success('Checker uploaded successfully!');
      return response;
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Failed to upload checker';
      toast.error(message);
      throw error;
    }
  },

  uploadVulnbox: async (file: File) => {
    set({ isLoading: true });
    try {
      const response = await gameService.uploadVulnbox(file);
      set({ isLoading: false });
      toast.success('Vulnbox uploaded successfully!');
      return response;
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Failed to upload vulnbox';
      toast.error(message);
      throw error;
    }
  },
}));
