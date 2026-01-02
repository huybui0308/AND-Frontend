import { create } from 'zustand';
import { Scoreboard } from '../types';
import { gameService } from '../services/gameService';

interface ScoreboardState {
  scoreboard: Scoreboard | null;
  isLoading: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  
  // Actions
  fetchScoreboard: () => Promise<void>;
  setAutoRefresh: (enabled: boolean) => void;
  setRefreshInterval: (interval: number) => void;
}

export const useScoreboardStore = create<ScoreboardState>((set) => ({
  scoreboard: null,
  isLoading: false,
  autoRefresh: true,
  refreshInterval: 10000, // 10 seconds

  fetchScoreboard: async () => {
    set({ isLoading: true });
    try {
      const scoreboard = await gameService.getScoreboard();
      set({ scoreboard, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      // Don't show error toast for scoreboard failures
      throw error;
    }
  },

  setAutoRefresh: (enabled: boolean) => {
    set({ autoRefresh: enabled });
  },

  setRefreshInterval: (interval: number) => {
    set({ refreshInterval: interval });
  },
}));
