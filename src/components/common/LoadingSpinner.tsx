import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullScreen = false,
  message,
}) => {
  const spinner = (
    <div className="spinner-container">
      <div className={`spinner spinner-${size}`}>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="spinner-fullscreen">{spinner}</div>;
  }

  return spinner;
};
