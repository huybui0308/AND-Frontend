import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlus, Users, Globe, Building } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button, Input, Card } from '../common';
import { SignupRequest } from '../../types';
import './AuthForms.css';

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>();

  const onSubmit = async (data: SignupRequest) => {
    try {
      setError('');
      await signup(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card" glass>
        <div className="auth-header">
          <div className="auth-icon">
            <UserPlus size={48} />
          </div>
          <h2 className="auth-title">Team Registration</h2>
          <p className="auth-subtitle">Register your team for the CTF</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <Input
            label="Team Name"
            type="text"
            placeholder="Enter your team name"
            icon={<Users size={20} />}
            error={errors.name?.message}
            {...register('name', {
              required: 'Team name is required',
              minLength: {
                value: 3,
                message: 'Team name must be at least 3 characters',
              },
            })}
          />

          <Input
            label="Country (Optional)"
            type="text"
            placeholder="e.g., USA, UK, Vietnam"
            icon={<Globe size={20} />}
            error={errors.country?.message}
            {...register('country')}
          />

          <Input
            label="Affiliation (Optional)"
            type="text"
            placeholder="University or Organization"
            icon={<Building size={20} />}
            error={errors.affiliation?.message}
            {...register('affiliation')}
          />

          {error && <div className="auth-error">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Register Team
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
