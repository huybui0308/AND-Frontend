import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { PageLayout } from '../../components/layout';
import { Button, Card } from '../../components/common';
import './ErrorPages.css';

export const NotFoundPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="error-page">
        <Card className="error-card">
          <div className="error-icon">
            <AlertCircle size={80} />
          </div>
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="default" size="lg">
              <Home size={20} />
              <span>Back to Home</span>
            </Button>
          </Link>
        </Card>
      </div>
    </PageLayout>
  );
};
