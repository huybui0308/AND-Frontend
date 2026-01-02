import React, { useEffect } from 'react';
import { Users, Play, Upload, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../components/layout';
import { Card, CardHeader, CardBody } from '../../components/common';
import { useTeamStore } from '../../stores/teamStore';
import { useGameStore } from '../../stores/gameStore';
import { useScoreboardStore } from '../../stores/scoreboardStore';
import './AdminPages.css';

export const AdminDashboardPage: React.FC = () => {
  const { teams, fetchTeams } = useTeamStore();
  const { game, fetchStatus } = useGameStore();
  const { scoreboard, fetchScoreboard } = useScoreboardStore();

  useEffect(() => {
    fetchTeams();
    fetchStatus();
    fetchScoreboard();
  }, [fetchTeams, fetchStatus, fetchScoreboard]);

  const adminCards = [
    {
      title: 'Manage Teams',
      icon: Users,
      description: 'Create, edit, and delete teams',
      link: '/admin/teams',
      color: 'var(--color-primary)',
      value: teams.length,
      label: 'Total Teams',
    },
    {
      title: 'Game Control',
      icon: Play,
      description: 'Start, stop, and monitor the game',
      link: '/admin/game',
      color: 'var(--color-success)',
      value: game?.status || 'N/A',
      label: 'Game Status',
    },
    {
      title: 'Upload Files',
      icon: Upload,
      description: 'Upload checker scripts and vulnbox files',
      link: '/admin/upload',
      color: 'var(--color-accent)',
      value: '2',
      label: 'File Types',
    },
    {
      title: 'Scoreboard',
      icon: Trophy,
      description: 'View live scoreboard',
      link: '/scoreboard',
      color: 'var(--color-secondary)',
      value: scoreboard?.current_tick || 0,
      label: 'Current Tick',
    },
  ];

  return (
    <PageLayout title="Admin Dashboard" subtitle="Manage your CTF competition">
      <div className="admin-dashboard-page">
        <div className="admin-cards-grid">
          {adminCards.map((card) => (
            <Link key={card.title} to={card.link} className="admin-card-link">
              <Card glass hover className="admin-card">
                <CardHeader>
                  <div className="admin-card-icon" style={{ background: card.color }}>
                    <card.icon size={32} />
                  </div>
                </CardHeader>
                <CardBody>
                  <h3>{card.title}</h3>
                  <p className="admin-card-description">{card.description}</p>
                  <div className="admin-card-stat">
                    <span className="admin-card-value">{card.value}</span>
                    <span className="admin-card-label">{card.label}</span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
