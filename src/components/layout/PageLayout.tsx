import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';

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
    <div className="min-h-screen bg-slate-50">
      {showNav && <Navbar />}
      <main className="container mx-auto px-4 py-8">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && <h1 className="text-4xl font-bold tracking-tight">{title}</h1>}
            {subtitle && <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        <div>{children}</div>
      </main>
    </div>
  );
};
