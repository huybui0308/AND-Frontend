import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import { ScoreboardTeam } from '../../types';
import './ScoreboardComponents.css';

interface RankPodiumProps {
  teams: ScoreboardTeam[];
}

export const RankPodium: React.FC<RankPodiumProps> = ({ teams }) => {
  const topThree = teams.slice(0, 3);
  const [first, second, third] = topThree;

  if (!first) return null;

  return (
    <div className="rank-podium">
      {/* Second Place */}
      {second && (
        <motion.div
          className="podium-place podium-second"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="podium-medal medal-silver">
            <Trophy size={32} />
          </div>
          <div className="podium-info">
            <h3 className="podium-team-name">{second.name}</h3>
            <p className="podium-score">{second.score.toFixed(2)} pts</p>
            <div className="podium-rank">2nd</div>
          </div>
        </motion.div>
      )}

      {/* First Place */}
      <motion.div
        className="podium-place podium-first"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="podium-medal medal-gold">
          <Trophy size={40} />
        </div>
        <div className="podium-info">
          <h3 className="podium-team-name">{first.name}</h3>
          <p className="podium-score">{first.score.toFixed(2)} pts</p>
          <div className="podium-rank">1st</div>
        </div>
      </motion.div>

      {/* Third Place */}
      {third && (
        <motion.div
          className="podium-place podium-third"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="podium-medal medal-bronze">
            <Trophy size={28} />
          </div>
          <div className="podium-info">
            <h3 className="podium-team-name">{third.name}</h3>
            <p className="podium-score">{third.score.toFixed(2)} pts</p>
            <div className="podium-rank">3rd</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

interface TeamRankRowProps {
  team: ScoreboardTeam;
  previousRank?: number;
}

export const TeamRankRow: React.FC<TeamRankRowProps> = ({ team, previousRank }) => {
  const rankChange = previousRank ? previousRank - team.rank : 0;

  return (
    <motion.tr
      className={`team-rank-row ${team.rank <= 3 ? `top-${team.rank}` : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <td className="rank-cell">
        <div className="rank-badge">{team.rank}</div>
        {rankChange !== 0 && (
          <div className={`rank-change ${rankChange > 0 ? 'rank-up' : 'rank-down'}`}>
            {rankChange > 0 ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span>{Math.abs(rankChange)}</span>
          </div>
        )}
      </td>
      <td className="team-name-cell">
        <span className="team-name">{team.name}</span>
      </td>
      <td className="score-cell">
        <span className="score-value">{team.score.toFixed(2)}</span>
      </td>
      <td className="points-cell">
        <div className="points-breakdown">
          <span className="point-item attack">{team.attack_points.toFixed(1)}</span>
        </div>
      </td>
      <td className="points-cell">
        <div className="points-breakdown">
          <span className="point-item defense">{team.defense_points.toFixed(1)}</span>
        </div>
      </td>
      <td className="points-cell">
        <div className="points-breakdown">
          <span className="point-item sla">{team.sla_points.toFixed(1)}</span>
        </div>
      </td>
      <td className="flags-cell">
        <span className="flag-count captured">{team.flags_captured}</span>
      </td>
      <td className="flags-cell">
        <span className="flag-count lost">{team.flags_lost}</span>
      </td>
    </motion.tr>
  );
};
