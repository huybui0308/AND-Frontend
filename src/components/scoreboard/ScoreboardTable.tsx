import React from 'react';
import { Card } from '../common';
import { ScoreboardTeam } from '../../types';
import { TeamRankRow } from './ScoreboardComponents';
import './ScoreboardTable.css';

interface ScoreboardTableProps {
  teams: ScoreboardTeam[];
  previousRanks?: Map<number | string, number>;
}

export const ScoreboardTable: React.FC<ScoreboardTableProps> = ({
  teams,
  previousRanks,
}) => {
  return (
    <Card className="scoreboard-table-card">
      <div className="scoreboard-table-wrapper">
        <table className="scoreboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Score</th>
              <th>Attack</th>
              <th>Defense</th>
              <th>SLA</th>
              <th>Captured</th>
              <th>Lost</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <TeamRankRow
                key={team.team_id}
                team={team}
                previousRank={previousRanks?.get(team.team_id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
