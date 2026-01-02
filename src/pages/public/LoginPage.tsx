import React from 'react';
import { PageLayout } from '../../components/layout';
import { LoginForm } from '../../components/auth';

export const LoginPage: React.FC = () => {
  return (
    <PageLayout showNav={false}>
      <LoginForm />
    </PageLayout>
  );
};
