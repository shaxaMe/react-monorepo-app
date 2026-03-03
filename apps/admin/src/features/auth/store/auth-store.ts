import type { AuthSession, AuthTokens, User } from '@repo/types';
import { storage } from '@repo/utils';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';



interface AuthState {
  readonly user: User | null;
  readonly tokens: AuthTokens | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly error: string | null;
}

interface AuthActions {
  setSession: (session: AuthSession) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setSession: (session) => {
          storage.set('auth-tokens', session.tokens);
          set(
            {
              user: session.user,
              tokens: session.tokens,
              isAuthenticated: true,
              error: null,
            },
            false,
            'auth/setSession',
          );
        },

        logout: () => {
          storage.remove('auth-tokens');
          set(initialState, false, 'auth/logout');
        },

        setLoading: (isLoading) => { set({ isLoading }, false, 'auth/setLoading'); },

        setError: (error) => { set({ error, isLoading: false }, false, 'auth/setError'); },
      }),
      {
        name: 'auth-store',
        // Only persist the user identity, not sensitive tokens (tokens go to a dedicated storage key)
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    { name: 'AuthStore' },
  ),
);
