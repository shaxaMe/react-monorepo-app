import type {
  CreateUserPayload,
  PaginatedResponse,
  PaginationParams,
  UpdateUserPayload,
  User,
} from '@repo/types';

/**
 * Users API service.
 * Uses mock data — swap httpClient calls for real backend.
 */

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => { setTimeout(resolve, ms); });

const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'editor@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'editor',
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'viewer@example.com',
    firstName: 'Bob',
    lastName: 'Johnson',
    role: 'viewer',
    status: 'inactive',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
];

let mockDb = [...MOCK_USERS];

export const usersApi = {
  async list(params: PaginationParams = {}): Promise<PaginatedResponse<User>> {
    await delay(600);
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const start = (page - 1) * limit;
    const data = mockDb.slice(start, start + limit);

    return {
      data,
      meta: {
        page,
        limit,
        total: mockDb.length,
        totalPages: Math.ceil(mockDb.length / limit),
      },
    };
  },

  async getById(id: string): Promise<User> {
    await delay(300);
    const user = mockDb.find((u) => u.id === id);
    if (!user) throw new Error(`User ${id} not found`);
    return user;
  },

  async create(payload: CreateUserPayload): Promise<User> {
    await delay(500);
    const newUser: User = {
      id: String(Date.now()),
      ...payload,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockDb = [...mockDb, newUser];
    return newUser;
  },

  async update(id: string, payload: UpdateUserPayload): Promise<User> {
    await delay(500);
    const index = mockDb.findIndex((u) => u.id === id);
    const existingUser = mockDb[index];
    if (!existingUser) throw new Error(`User ${id} not found`);

    const updated: User = {
      ...existingUser,
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    mockDb = mockDb.map((u) => (u.id === id ? updated : u));
    return updated;
  },

  async delete(id: string): Promise<void> {
    await delay(400);
    mockDb = mockDb.filter((u) => u.id !== id);
  },
};
