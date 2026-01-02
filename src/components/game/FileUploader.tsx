import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button, Card } from '../common';
import '../game/GameComponents.css';

interface FileUploaderProps {
  title: string;
  acceptedTypes: string;
  typeHint: string;
  onUpload: (file: File) => Promise<any>;
  isLoading?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  title,
  acceptedTypes,
  typeHint,
  onUpload,
  isLoading,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await onUpload(selectedFile);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="file-uploader-card" glass>
      <h3>{title}</h3>

      <div
        className={`file-dropzone ${dragActive ? 'file-dropzone-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleChange}
          style={{ display: 'none' }}
        />

        <Upload size={48} className="file-icon" />
        <h3>Upload File</h3>
        <p>Drag and drop or click to browse</p>
        <p className="file-type-hint">{typeHint}</p>
      </div>

      {selectedFile && (
        <div className="file-selected">
          <div className="file-info">
            <FileText size={24} />
            <div>
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button className="file-remove-btn" onClick={removeFile}>
            <X size={20} />
          </button>
        </div>
      )}

      {selectedFile && (
        <Button
          variant="primary"
          fullWidth
          onClick={handleUpload}
          isLoading={isLoading}
        >
          Upload
        </Button>
      )}
    </Card>
  );
};
