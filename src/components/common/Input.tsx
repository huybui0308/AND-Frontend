import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className={`input-group ${className}`}>
        {label && <label className="input-label">{label}</label>}
        <div className="input-wrapper">
          {icon && <div className="input-icon">{icon}</div>}
          <input
            ref={ref}
            className={`input ${error ? 'input-error' : ''} ${icon ? 'input-with-icon' : ''}`}
            {...props}
          />
        </div>
        {error && <span className="input-error-message">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = '', rows = 4, ...props }, ref) => {
    return (
      <div className={`input-group ${className}`}>
        {label && <label className="input-label">{label}</label>}
        <textarea
          ref={ref}
          rows={rows}
          className={`input input-textarea ${error ? 'input-error' : ''}`}
          {...props}
        />
        {error && <span className="input-error-message">{error}</span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
