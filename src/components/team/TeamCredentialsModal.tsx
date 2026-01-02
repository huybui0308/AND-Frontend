import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Modal } from '../common';
import { TeamCreatedResponse } from '../../types';
import './TeamComponents.css';

interface TeamCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamData: TeamCreatedResponse;
}

export const TeamCredentialsModal: React.FC<TeamCredentialsModalProps> = ({
  isOpen,
  onClose,
  teamData,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Team Created Successfully" size="md">
      <div className="team-credentials">
        <p className="team-credentials-warning">
          ⚠️ Save these credentials now! The password will not be shown again.
        </p>

        <div className="credential-item">
          <label>Team Name</label>
          <div className="credential-value">
            <code>{teamData.name}</code>
          </div>
        </div>

        <div className="credential-item">
          <label>Username</label>
          <div className="credential-value">
            <code>{teamData.username}</code>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(teamData.username, 'username')}
            >
              {copiedField === 'username' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div className="credential-item">
          <label>Default Password</label>
          <div className="credential-value">
            <code>{teamData.defaultPassword}</code>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(teamData.defaultPassword, 'password')}
            >
              {copiedField === 'password' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
