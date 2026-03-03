import type { AuthCredentials, AuthSession, User } from '@repo/types';

/**
 * Mock auth API service.
 * Replace with real httpClient calls when a backend is available.
 * The mock simulates network latency and validates credentials.
 */

const MOCK_USER: User = {
  id: '1',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  status: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const MOCK_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'password123',
} as const;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => { setTimeout(resolve, ms); });

export const authApi = {
  async login(credentials: AuthCredentials): Promise<AuthSession> {
    await delay(800); // simulate network

    if (
      credentials.email !== MOCK_CREDENTIALS.email ||
      credentials.password !== MOCK_CREDENTIALS.password
    ) {
      throw new Error('Invalid email or password');
    }

    return {
      user: MOCK_USER,
      tokens: {
        accessToken: `mock-access-token-${String(Date.now())}`,
        refreshToken: `mock-refresh-token-${String(Date.now())}`,
        expiresIn: 3600,
      },
    };
  },

  async logout(): Promise<void> {
    await delay(200);
  },
};
