import api from './api';
import { Game, Scoreboard, UploadResponse } from '../types';

export const gameService = {
  // Get game status
  getStatus: async (): Promise<Game> => {
    const response = await api.get<Game>('/game/status');
    return response.data;
  },

  // Start game
  start: async (): Promise<Game> => {
    const response = await api.post<Game>('/game/start');
    return response.data;
  },

  // Stop game
  stop: async (): Promise<Game> => {
    const response = await api.post<Game>('/game/stop');
    return response.data;
  },

  // Get scoreboard
  getScoreboard: async (): Promise<Scoreboard> => {
    const response = await api.get<Scoreboard>('/scoreboard');
    return response.data;
  },

  // Upload checker script
  uploadChecker: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<UploadResponse>('/upload/checker', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Upload vulnbox
  uploadVulnbox: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<UploadResponse>('/upload/vulnbox', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
