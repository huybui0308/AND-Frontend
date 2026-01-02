import React, { useEffect } from 'react';
import { Trophy, Users, Target } from 'lucide-react';
import { PageLayout } from '../../components/layout';
import { Card, CardHeader, CardBody } from '../../components/common';
import { useAuthStore } from '../../stores/authStore';
import { useScoreboardStore } from '../../stores/scoreboardStore';
import './TeamPages.css';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { scoreboard, fetchScoreboard } = useScoreboardStore();

  useEffect(() => {
    fetchScoreboard();
  }, [fetchScoreboard]);

  const myTeam = scoreboard?.teams.find((t) => t.name === user?.teamName);

  return (
    <PageLayout
      title={`Welcome, ${user?.teamName}!`}
      subtitle="Your team dashboard"
    >
      <div className="dashboard-page">
        <div className="dashboard-grid">
          {myTeam ? (
            <>
              <Card glass>
                <CardHeader>
                  <h3>
                    <Trophy size={24} />
                    Your Rank
                  </h3>
                </CardHeader>
                <CardBody>
                  <div className="dashboard-stat">
                    <span className="stat-value">{myTeam.rank}</span>
                    <span className="stat-label">Position</span>
                  </div>
                </CardBody>
              </Card>

              <Card glass>
                <CardHeader>
                  <h3>
                    <Target size={24} />
                    Total Score
                  </h3>
                </CardHeader>
                <CardBody>
                  <div className="dashboard-stat">
                    <span className="stat-value">{myTeam.score.toFixed(2)}</span>
                    <span className="stat-label">Points</span>
                  </div>
                </CardBody>
              </Card>

              <Card glass>
                <CardHeader>
                  <h3>Points Breakdown</h3>
                </CardHeader>
                <CardBody>
                  <div className="points-breakdown-grid">
                    <div className="point-stat">
                      <span className="point-label">Attack</span>
                      <span className="point-value attack">
                        {myTeam.attack_points.toFixed(1)}
                      </span>
                    </div>
                    <div className="point-stat">
                      <span className="point-label">Defense</span>
                      <span className="point-value defense">
                        {myTeam.defense_points.toFixed(1)}
                      </span>
                    </div>
                    <div className="point-stat">
                      <span className="point-label">SLA</span>
                      <span className="point-value sla">
                        {myTeam.sla_points.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card glass>
                <CardHeader>
                  <h3>Flags</h3>
                </CardHeader>
                <CardBody>
                  <div className="flags-grid">
                    <div className="flag-stat">
                      <span className="flag-label">Captured</span>
                      <span className="flag-value captured">
                        {myTeam.flags_captured}
                      </span>
                    </div>
                    <div className="flag-stat">
                      <span className="flag-label">Lost</span>
                      <span className="flag-value lost">{myTeam.flags_lost}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </>
          ) : (
            <Card glass>
              <CardBody>
                <div className="dashboard-empty">
                  <Users size={48} />
                  <p>No scoreboard data available yet</p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        <Card glass className="team-info-card">
          <CardHeader>
            <h3>Team Information</h3>
          </CardHeader>
          <CardBody>
            <div className="team-info-grid">
              <div className="info-item">
                <span className="info-label">Team Name:</span>
                <span className="info-value">{user?.teamName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Username:</span>
                <span className="info-value">{user?.username}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Role:</span>
                <span className="info-value">{user?.role}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </PageLayout>
  );
};
