import { create } from 'zustand';
import { Team, CreateTeamRequest, UpdateTeamRequest, TeamCreatedResponse } from '../types';
import { teamService } from '../services/teamService';
import toast from 'react-hot-toast';

interface TeamState {
  teams: Team[];
  selectedTeam: Team | null;
  isLoading: boolean;
  
  // Actions
  fetchTeams: () => Promise<void>;
  createTeam: (data: CreateTeamRequest) => Promise<TeamCreatedResponse>;
  updateTeam: (id: number, data: UpdateTeamRequest) => Promise<void>;
  deleteTeam: (id: number) => Promise<void>;
  bulkImport: (file: File) => Promise<TeamCreatedResponse[]>;
  setSelectedTeam: (team: Team | null) => void;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  teams: [],
  selectedTeam: null,
  isLoading: false,

  fetchTeams: async () => {
    set({ isLoading: true });
    try {
      const teams = await teamService.getAll();
      set({ teams, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Failed to fetch teams';
      toast.error(message);
      throw error;
    }
  },

  createTeam: async (data: CreateTeamRequest) => {
    set({ isLoading: true });
    try {
      const response = await teamService.create(data);
      await get().fetchTeams();
      set({ isLoading: false });
      toast.success('Team created successfully!');
      return response;
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Failed to create team';
      toast.error(message);
      throw error;
    }
  },

  updateTeam: async (id: number, data: UpdateTeamRequest) => {
    set({ isLoading: true });
    try {
      await teamService.update(id, data);
      await get().fetchTeams();
      set({ isLoading: false });
      toast.success('Team updated successfully!');
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Failed to update team';
      toast.error(message);
      throw error;
    }
  },

  deleteTeam: async (id: number) => {
    set({ isLoading: true });
    try {
      await teamService.delete(id);
      await get().fetchTeams();
      set({ isLoading: false });
      toast.success('Team deleted successfully!');
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Failed to delete team';
      toast.error(message);
      throw error;
    }
  },

  bulkImport: async (file: File) => {
    set({ isLoading: true });
    try {
      const response = await teamService.bulkImport(file);
      await get().fetchTeams();
      set({ isLoading: false });
      toast.success(`Successfully imported ${response.length} teams!`);
      return response;
    } catch (error: any) {
      set({ isLoading: false });
      const message = error.response?.data?.message || 'Failed to import teams';
      toast.error(message);
      throw error;
    }
  },

  setSelectedTeam: (team: Team | null) => {
    set({ selectedTeam: team });
  },
}));
