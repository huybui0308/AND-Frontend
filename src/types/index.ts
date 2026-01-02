// User & Auth Types
export interface User {
  id: number;
  username: string;
  teamName: string;
  role: 'ADMIN' | 'TEACHER' | 'TEAM';
  token?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: 'Bearer';
  id: number;
  username: string;
  teamName: string;
  roles: string[];
}

export interface SignupRequest {
  name: string;
  country?: string;
  affiliation?: string;
}

// Team Types
export interface Team {
  id: number;
  username?: string;
  name: string;
  affiliation?: string;
  country?: string;
  ipAddress?: string;
}

export interface CreateTeamRequest {
  name: string;
  country?: string;
  affiliation?: string;
  ipAddress?: string;
}

export interface TeamCreatedResponse {
  success: boolean;
  id: number;
  name: string;
  username: string;
  defaultPassword: string;
}

export interface UpdateTeamRequest {
  name?: string;
  country?: string;
  affiliation?: string;
  ipAddress?: string;
}

// Game Types
export type GameStatus = 'DRAFT' | 'DEPLOYING' | 'RUNNING' | 'PAUSED' | 'FINISHED';

export interface Game {
  id: string;
  name: string;
  status: GameStatus;
  current_tick: number;
  tick_duration_seconds: number;
  start_time?: string;
  end_time?: string;
}

// Scoreboard Types
export interface ScoreboardTeam {
  team_id: number | string;
  name: string;
  rank: number;
  score: number;
  attack_points: number;
  defense_points: number;
  sla_points: number;
  flags_captured: number;
  flags_lost: number;
}

export interface Scoreboard {
  game_id: string;
  current_tick: number;
  teams: ScoreboardTeam[];
}

// Upload Types
export interface UploadResponse {
  success: boolean;
  message: string;
  filename?: string;
}

// API Response Types
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success?: boolean;
}
