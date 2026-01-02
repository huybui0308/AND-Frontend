import React, { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  className?: string;
 ?: boolean;
  elevated?: boolean;
 ?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  = false,
  elevated = false,
  = false,
  onClick,
}) => {
  const classes = [
    'card',
    && 'card-glass',
    elevated && 'card-elevated',
    && 'card-hover',
    onClick && 'card-clickable',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`card-header ${className}`}>{children}</div>;
};

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return <div className={`card-body ${className}`}>{children}</div>;
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return <div className={`card-footer ${className}`}>{children}</div>;
};
