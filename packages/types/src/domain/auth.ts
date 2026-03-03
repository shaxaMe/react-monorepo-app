import type { User } from './user';

export interface AuthCredentials {
  readonly email: string;
  readonly password: string;
}

export interface AuthTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
}

export interface AuthSession {
  readonly user: User;
  readonly tokens: AuthTokens;
}
