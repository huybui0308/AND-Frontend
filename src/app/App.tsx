import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Router } from './Router';
import { useAuthStore } from '../stores/authStore';
import '../styles/globals.css';
import '../styles/animations.css';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Router />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--color-primary)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-mono)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'var(--bg-card)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-error)',
              secondary: 'var(--bg-card)',
            },
          },
        }}
      />
    </>
  );
}

export default App;
