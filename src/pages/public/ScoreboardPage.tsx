import React, { useEffect, useState } from 'react';
import { RefreshCw, Play, Pause } from 'lucide-react';
import { PageLayout } from '../../components/layout';
import { Button, LoadingSpinner } from '../../components/common';
import { RankPodium, ScoreboardTable } from '../../components/scoreboard';
import { useScoreboardStore } from '../../stores/scoreboardStore';
import './ScoreboardPage.css';

export const ScoreboardPage: React.FC = () => {
  const { scoreboard, isLoading, autoRefresh, fetchScoreboard, setAutoRefresh } = useScoreboardStore();
  const [previousRanks, setPreviousRanks] = useState<Map<number | string, number>>(new Map());

  useEffect(() => {
    fetchScoreboard();
  }, [fetchScoreboard]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchScoreboard();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, fetchScoreboard]);

  useEffect(() => {
    if (scoreboard) {
      const ranks = new Map<number | string, number>();
      scoreboard.teams.forEach((team) => {
        ranks.set(team.team_id, team.rank);
      });
      setPreviousRanks(ranks);
    }
  }, [scoreboard]);

  const handleRefresh = () => {
    fetchScoreboard();
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  if (isLoading && !scoreboard) {
    return (
      <PageLayout title="Live Scoreboard" subtitle="Real-time team rankings">
        <LoadingSpinner fullScreen message="Loading scoreboard..." />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Live Scoreboard" subtitle="Real-time team rankings">
      <div className="scoreboard-page">
        <div className="scoreboard-controls">
          <div className="scoreboard-info">
            {scoreboard && (
              <>
                <span className="scoreboard-tick">
                  Tick: <strong>{scoreboard.current_tick}</strong>
                </span>
                <span className="scoreboard-teams">
                  Teams: <strong>{scoreboard.teams.length}</strong>
                </span>
              </>
            )}
          </div>
          <div className="scoreboard-actions">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAutoRefresh}
            >
              {autoRefresh ? <Pause size={18} /> : <Play size={18} />}
              <span>{autoRefresh ? 'Pause' : 'Resume'} Auto-refresh</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              isLoading={isLoading}
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {scoreboard && scoreboard.teams.length > 0 ? (
          <>
            <RankPodium teams={scoreboard.teams} />
            <ScoreboardTable teams={scoreboard.teams} previousRanks={previousRanks} />
          </>
        ) : (
          <div className="scoreboard-empty">
            <p>No teams registered yet</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
