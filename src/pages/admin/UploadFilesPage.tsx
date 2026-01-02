import React from 'react';
import { PageLayout } from '../../components/layout';
import { FileUploader } from '../../components/game';
import { useGameStore } from '../../stores/gameStore';
import './AdminPages.css';

export const UploadFilesPage: React.FC = () => {
  const { uploadChecker, uploadVulnbox, isLoading } = useGameStore();

  return (
    <PageLayout
      title="Upload Files"
      subtitle="Upload checker scripts and vulnbox files"
    >
      <div className="upload-files-page">
        <div className="upload-grid">
          <FileUploader
            title="Upload Checker Script"
            acceptedTypes=".py"
            typeHint="Python script (.py)"
            onUpload={uploadChecker}
            isLoading={isLoading}
          />

          <FileUploader
            title="Upload Vulnbox"
            acceptedTypes=".zip"
            typeHint="ZIP archive (.zip)"
            onUpload={uploadVulnbox}
            isLoading={isLoading}
          />
        </div>
      </div>
    </PageLayout>
  );
};
