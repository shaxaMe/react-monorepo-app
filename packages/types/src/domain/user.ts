export type UserRole = 'admin' | 'editor' | 'viewer';

export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: UserRole;
  readonly status: UserStatus;
  readonly avatarUrl?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateUserPayload {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: UserRole;
}

export interface UpdateUserPayload {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly role?: UserRole;
  readonly status?: UserStatus;
}
