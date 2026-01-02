import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PageLayout } from '../../components/layout';
import { Button, Input, Card } from '../../components/common';
import { TeamCredentialsModal } from '../../components/team';
import { useTeamStore } from '../../stores/teamStore';
import { CreateTeamRequest, TeamCreatedResponse } from '../../types';
import './AdminPages.css';

export const CreateTeamPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTeam, isLoading } = useTeamStore();
  const [createdTeam, setCreatedTeam] = useState<TeamCreatedResponse | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTeamRequest>();

  const onSubmit = async (data: CreateTeamRequest) => {
    try {
      const response = await createTeam(data);
      setCreatedTeam(response);
    } catch (err) {
      // Error handled by store
    }
  };

  const handleClose = () => {
    setCreatedTeam(null);
    navigate('/admin/teams');
  };

  return (
    <PageLayout title="Create New Team" subtitle="Add a new team to the competition">
      <div className="create-team-page">
        <Card glass className="team-form-card">
          <form onSubmit={handleSubmit(onSubmit)} className="team-form">
            <Input
              label="Team Name *"
              type="text"
              placeholder="Enter team name"
              error={errors.name?.message}
              {...register('name', {
                required: 'Team name is required',
                minLength: {
                  value: 3,
                  message: 'Team name must be at least 3 characters',
                },
              })}
            />

            <Input
              label="Country"
              type="text"
              placeholder="e.g., USA, UK, Vietnam"
              error={errors.country?.message}
              {...register('country')}
            />

            <Input
              label="Affiliation"
              type="text"
              placeholder="University or Organization"
              error={errors.affiliation?.message}
              {...register('affiliation')}
            />

            <Input
              label="IP Address"
              type="text"
              placeholder="e.g., 192.168.1.100"
              error={errors.ipAddress?.message}
              {...register('ipAddress', {
                pattern: {
                  value: /^(\d{1,3}\.){3}\d{1,3}$/,
                  message: 'Invalid IP address format',
                },
              })}
            />

            <div className="form-actions">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/admin/teams')}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" isLoading={isLoading}>
                Create Team
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {createdTeam && (
        <TeamCredentialsModal
          isOpen={!!createdTeam}
          onClose={handleClose}
          teamData={createdTeam}
        />
      )}
    </PageLayout>
  );
};
