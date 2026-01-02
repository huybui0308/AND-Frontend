import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn, User, Lock } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button, Input, Card } from '../common';
import { LoginRequest } from '../../types';
import './AuthForms.css';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      setError('');
      await login(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card" glass>
        <div className="auth-header">
          <div className="auth-icon">
            <LogIn size={48} />
          </div>
          <h2 className="auth-title">Login</h2>
          <p className="auth-subtitle">Access the CTF platform</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            icon={<User size={20} />}
            error={errors.username?.message}
            {...register('username', {
              required: 'Username is required',
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock size={20} />}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
            })}
          />

          {error && <div className="auth-error">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
