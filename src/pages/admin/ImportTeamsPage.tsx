import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout';
import { TeamCredentialsModal } from '../../components/team';
import { CsvImport } from '../../components/team';
import { useTeamStore } from '../../stores/teamStore';
import { TeamCreatedResponse } from '../../types';
import './AdminPages.css';

export const ImportTeamsPage: React.FC = () => {
  const navigate = useNavigate();
  const { bulkImport, isLoading } = useTeamStore();
  const [importedTeams, setImportedTeams] = useState<TeamCreatedResponse[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleImport = async (file: File) => {
    try {
      const response = await bulkImport(file);
      setImportedTeams(response);
      setShowModal(true);
    } catch (err) {
      // Error handled by store
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/admin/teams');
  };

  return (
    <PageLayout
      title="Import Teams from CSV"
      subtitle="Bulk import teams from a CSV file"
    >
      <div className="import-teams-page">
        <CsvImport onImport={handleImport} isLoading={isLoading} />

        {importedTeams.length > 0 && showModal && (
          <TeamCredentialsModal
            isOpen={showModal}
            onClose={handleClose}
            teamData={importedTeams[0]}
          />
        )}
      </div>
    </PageLayout>
  );
};
