import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Upload as UploadIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout';
import { Button, Card, ConfirmDialog, LoadingSpinner } from '../../components/common';
import { useTeamStore } from '../../stores/teamStore';
import { Team } from '../../types';
import './AdminPages.css';

export const TeamsManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { teams, isLoading, fetchTeams, deleteTeam } = useTeamStore();
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; team: Team | null }>({
    isOpen: false,
    team: null,
  });

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleDelete = async () => {
    if (deleteConfirm.team) {
      await deleteTeam(deleteConfirm.team.id);
      setDeleteConfirm({ isOpen: false, team: null });
    }
  };

  if (isLoading && teams.length === 0) {
    return (
      <PageLayout title="Teams Management" subtitle="Manage all registered teams">
        <LoadingSpinner fullScreen message="Loading teams..." />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Teams Management" subtitle="Manage all registered teams">
      <div className="teams-management-page">
        <div className="teams-actions">
          <Link to="/admin/teams/new">
            <Button variant="default">
              <Plus size={20} />
              <span>Create Team</span>
            </Button>
          </Link>
          <Link to="/admin/teams/import">
            <Button variant="secondary">
              <UploadIcon size={20} />
              <span>Import CSV</span>
            </Button>
          </Link>
        </div>

        <Card className="teams-table-card">
          {teams.length === 0 ? (
            <div className="teams-empty">
              <p>No teams registered yet</p>
              <Link to="/admin/teams/new">
                <Button variant="default">Create First Team</Button>
              </Link>
            </div>
          ) : (
            <div className="teams-table-wrapper">
              <table className="teams-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Country</th>
                    <th>Affiliation</th>
                    <th>IP Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td>{team.id}</td>
                      <td className="team-name-col">{team.name}</td>
                      <td>{team.username || '-'}</td>
                      <td>{team.country || '-'}</td>
                      <td>{team.affiliation || '-'}</td>
                      <td className="ip-col">{team.ipAddress || '-'}</td>
                      <td className="actions-col">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => navigate(`/admin/teams/edit/${team.id}`)}
                          title="Edit team"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => setDeleteConfirm({ isOpen: true, team })}
                          title="Delete team"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, team: null })}
        onConfirm={handleDelete}
        title="Delete Team"
        message={`Are you sure you want to delete team "${deleteConfirm.team?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={isLoading}
      />
    </PageLayout>
  );
};
