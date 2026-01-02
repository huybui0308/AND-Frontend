import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button, Card } from '../common';
import './CsvImport.css';

interface CsvImportProps {
  onImport: (file: File) => Promise<void>;
  isLoading?: boolean;
}

export const CsvImport: React.FC<CsvImportProps> = ({ onImport, isLoading }) => {
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
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      setSelectedFile(file);
    } else {
      alert('Please select a CSV file');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await onImport(selectedFile);
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
    <Card className="csv-import-card" glass>
      <div
        className={`csv-dropzone ${dragActive ? 'csv-dropzone-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleChange}
          style={{ display: 'none' }}
        />

        <Upload size={48} className="csv-icon" />
        <h3>Upload CSV File</h3>
        <p>Drag and drop or click to browse</p>
        <p className="csv-format-hint">
          Format: name, country, affiliation, ipAddress
        </p>
      </div>

      {selectedFile && (
        <div className="csv-selected-file">
          <div className="csv-file-info">
            <FileText size={24} />
            <div>
              <p className="csv-file-name">{selectedFile.name}</p>
              <p className="csv-file-size">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button className="csv-remove-btn" onClick={removeFile}>
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
          Import Teams
        </Button>
      )}
    </Card>
  );
};
