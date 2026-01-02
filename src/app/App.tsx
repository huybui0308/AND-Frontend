import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { Router } from './Router';
import { useAuthStore } from '../stores/authStore';
import '../styles/globals.css';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Router />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
