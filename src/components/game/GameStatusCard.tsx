import React from 'react';
import { Activity, Clock, Hash } from 'lucide-react';
import { Card } from '../common';
import { Game, GameStatus } from '../../types';
import './GameComponents.css';

interface GameStatusCardProps {
  game: Game | null;
  isLoading?: boolean;
}

export const GameStatusCard: React.FC<GameStatusCardProps> = ({ game, isLoading }) => {
  const getStatusColor = (status: GameStatus) => {
    switch (status) {
      case 'RUNNING':
        return 'var(--color-success)';
      case 'PAUSED':
        return 'var(--color-warning)';
      case 'FINISHED':
        return 'var(--text-secondary)';
      case 'DEPLOYING':
        return 'var(--color-primary)';
      default:
        return 'var(--text-muted)';
    }
  };

  const getStatusLabel = (status: GameStatus) => {
    switch (status) {
      case 'DRAFT':
        return 'Draft';
      case 'DEPLOYING':
        return 'Deploying...';
      case 'RUNNING':
        return 'Running';
      case 'PAUSED':
        return 'Paused';
      case 'FINISHED':
        return 'Finished';
      default:
        return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <Card className="game-status-card">
        <div className="game-status-loading">Loading game status...</div>
      </Card>
    );
  }

  if (!game) {
    return (
      <Card className="game-status-card">
        <div className="game-status-empty">No game configured</div>
      </Card>
    );
  }

  return (
    <Card className="game-status-card">
      <div className="game-status-header">
        <h3 className="game-name">{game.name}</h3>
        <div
          className="game-status-badge"
          style={{ background: getStatusColor(game.status) }}
        >
          {getStatusLabel(game.status)}
        </div>
      </div>

      <div className="game-status-grid">
        <div className="game-stat">
          <div className="game-stat-icon">
            <Hash size={24} />
          </div>
          <div className="game-stat-info">
            <span className="game-stat-label">Current Tick</span>
            <span className="game-stat-value">{game.current_tick}</span>
          </div>
        </div>

        <div className="game-stat">
          <div className="game-stat-icon">
            <Clock size={24} />
          </div>
          <div className="game-stat-info">
            <span className="game-stat-label">Tick Duration</span>
            <span className="game-stat-value">{game.tick_duration_seconds}s</span>
          </div>
        </div>

        <div className="game-stat">
          <div className="game-stat-icon">
            <Activity size={24} />
          </div>
          <div className="game-stat-info">
            <span className="game-stat-label">Status</span>
            <span className="game-stat-value">{getStatusLabel(game.status)}</span>
          </div>
        </div>
      </div>

      {game.start_time && (
        <div className="game-time-info">
          <p>
            <strong>Started:</strong>{' '}
            {new Date(game.start_time).toLocaleString()}
          </p>
          {game.end_time && (
            <p>
              <strong>Ended:</strong> {new Date(game.end_time).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};
