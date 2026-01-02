import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShieldAlert } from 'lucide-react';
import { PageLayout } from '../../components/layout';
import { Button, Card } from '../../components/common';
import './ErrorPages.css';

export const UnauthorizedPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="error-page">
        <Card glass className="error-card">
          <div className="error-icon unauthorized">
            <ShieldAlert size={80} />
          </div>
          <h1 className="error-code">403</h1>
          <h2 className="error-title">Access Denied</h2>
          <p className="error-message">
            You don't have permission to access this resource.
          </p>
          <Link to="/dashboard">
            <Button variant="primary" size="lg">
              <Home size={20} />
              <span>Go to Dashboard</span>
            </Button>
          </Link>
        </Card>
      </div>
    </PageLayout>
  );
};
