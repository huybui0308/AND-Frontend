import React from 'react';
import { PageLayout } from '../../components/layout';
import { SignupForm } from '../../components/auth';

export const SignupPage: React.FC = () => {
  return (
    <PageLayout showNav={false}>
      <SignupForm />
    </PageLayout>
  );
};
