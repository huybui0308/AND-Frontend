import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { AnimatedBg } from './AnimatedBg';
import './PageLayout.css';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showNav?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  showNav = true,
}) => {
  return (
    <div className="page-layout">
      <AnimatedBg />
      {showNav && <Navbar />}
      <main className="page-content">
        {(title || subtitle) && (
          <div className="page-header">
            {title && <h1 className="page-title">{title}</h1>}
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="page-body">{children}</div>
      </main>
    </div>
  );
};
