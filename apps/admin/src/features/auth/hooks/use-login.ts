import type { AuthCredentials } from '@repo/types';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


import { authApi } from '../api/auth-api';
import { useAuthStore } from '../store/auth-store';

interface LoginFormState {
  email: string;
  password: string;
}

interface UseLoginReturn {
  readonly formState: LoginFormState;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly handleChange: (field: keyof LoginFormState) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSession, setLoading, setError, isLoading, error } = useAuthStore((s) => ({
    setSession: s.setSession,
    setLoading: s.setLoading,
    setError: s.setError,
    isLoading: s.isLoading,
    error: s.error,
  }));

  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const handleChange =
    (field: keyof LoginFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [field]: e.target.value }));
      if (error) setError(null);
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials: AuthCredentials = {
      email: formState.email.trim(),
      password: formState.password,
    };

    setLoading(true);

    authApi
      .login(credentials)
      .then((session) => {
        setSession(session);
        const redirectTo = (location.state as { from?: { pathname: string } } | undefined)?.from?.pathname ?? '/dashboard';
        navigate(redirectTo, { replace: true });
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(message);
      });
  };

  return { formState, isLoading, error, handleChange, handleSubmit };
};
