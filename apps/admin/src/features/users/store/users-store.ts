import type { CreateUserPayload, PaginationMeta, UpdateUserPayload, User } from '@repo/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';


import { usersApi } from '../api/users-api';

interface UsersState {
  readonly users: User[];
  readonly selectedUser: User | null;
  readonly pagination: PaginationMeta | null;
  readonly isLoading: boolean;
  readonly error: string | null;
}

interface UsersActions {
  fetchUsers: (page?: number) => Promise<void>;
  createUser: (payload: CreateUserPayload) => Promise<void>;
  updateUser: (id: string, payload: UpdateUserPayload) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  selectUser: (user: User | null) => void;
  clearError: () => void;
}

type UsersStore = UsersState & UsersActions;

export const useUsersStore = create<UsersStore>()(
  devtools(
    (set, _get) => ({
      users: [],
      selectedUser: null,
      pagination: null,
      isLoading: false,
      error: null,

      fetchUsers: async (page = 1) => {
        set({ isLoading: true, error: null }, false, 'users/fetchUsers/pending');
        try {
          const result = await usersApi.list({ page, limit: 10 });
          set(
            { users: result.data, pagination: result.meta, isLoading: false },
            false,
            'users/fetchUsers/fulfilled',
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to load users';
          set({ error: message, isLoading: false }, false, 'users/fetchUsers/rejected');
        }
      },

      createUser: async (payload) => {
        set({ isLoading: true, error: null }, false, 'users/createUser/pending');
        try {
          const newUser = await usersApi.create(payload);
          set(
            (state) => ({ users: [...state.users, newUser], isLoading: false }),
            false,
            'users/createUser/fulfilled',
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to create user';
          set({ error: message, isLoading: false }, false, 'users/createUser/rejected');
          throw err;
        }
      },

      updateUser: async (id, payload) => {
        set({ isLoading: true, error: null }, false, 'users/updateUser/pending');
        try {
          const updated = await usersApi.update(id, payload);
          set(
            (state) => ({
              users: state.users.map((u) => (u.id === id ? updated : u)),
              selectedUser: state.selectedUser?.id === id ? updated : state.selectedUser,
              isLoading: false,
            }),
            false,
            'users/updateUser/fulfilled',
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to update user';
          set({ error: message, isLoading: false }, false, 'users/updateUser/rejected');
          throw err;
        }
      },

      deleteUser: async (id) => {
        set({ isLoading: true, error: null }, false, 'users/deleteUser/pending');
        try {
          await usersApi.delete(id);
          set(
            (state) => ({
              users: state.users.filter((u) => u.id !== id),
              selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
              isLoading: false,
            }),
            false,
            'users/deleteUser/fulfilled',
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to delete user';
          set({ error: message, isLoading: false }, false, 'users/deleteUser/rejected');
          throw err;
        }
      },

      selectUser: (user) => { set({ selectedUser: user }, false, 'users/selectUser'); },
      clearError: () => { set({ error: null }, false, 'users/clearError'); },
    }),
    { name: 'UsersStore' },
  ),
);
