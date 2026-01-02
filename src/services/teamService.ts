import api from './api';
import { Team, CreateTeamRequest, TeamCreatedResponse, UpdateTeamRequest } from '../types';

export const teamService = {
  // Get all teams
  getAll: async (): Promise<Team[]> => {
    const response = await api.get<Team[]>('/teams');
    return response.data;
  },

  // Get team by ID
  getById: async (id: number): Promise<Team> => {
    const response = await api.get<Team>(`/teams/${id}`);
    return response.data;
  },

  // Create team
  create: async (data: CreateTeamRequest): Promise<TeamCreatedResponse> => {
    const response = await api.post<TeamCreatedResponse>('/teams', data);
    return response.data;
  },

  // Update team
  update: async (id: number, data: UpdateTeamRequest): Promise<Team> => {
    const response = await api.put<Team>(`/teams/${id}`, data);
    return response.data;
  },

  // Delete team
  delete: async (id: number): Promise<void> => {
    await api.delete(`/teams/${id}`);
  },

  // Bulk import from CSV
  bulkImport: async (file: File): Promise<TeamCreatedResponse[]> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<TeamCreatedResponse[]>('/teams/bulk', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
