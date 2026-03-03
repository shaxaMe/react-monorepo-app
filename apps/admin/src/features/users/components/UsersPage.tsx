
import { useDisclosure } from '@repo/hooks';
import type { User } from '@repo/types';
import { Button, Modal, Table } from '@repo/ui';
import type { ColumnDef } from '@repo/ui';
import { formatDate } from '@repo/utils';
import { useEffect } from 'react';

import { useUsersStore } from '../store/users-store';

import { CreateUserForm } from './CreateUserForm';
import styles from './UsersPage.module.css';
import { UserStatusBadge } from './UserStatusBadge';

const columns: ColumnDef<User>[] = [
  {
    key: 'name',
    header: 'Name',
    cell: (user) => (
      <div className={styles.nameCell}>
        <span className={styles.fullName}>
          {user.firstName} {user.lastName}
        </span>
        <span className={styles.email}>{user.email}</span>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    width: '120px',
    cell: (user) => <span className={styles.roleBadge}>{user.role}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    width: '100px',
    cell: (user) => <UserStatusBadge status={user.status} />,
  },
  {
    key: 'createdAt',
    header: 'Joined',
    width: '140px',
    cell: (user) => <span>{formatDate(user.createdAt)}</span>,
  },
  {
    key: 'actions',
    header: 'Actions',
    width: '100px',
    cell: (user) => <UserActions user={user} />,
  },
];

const UserActions = ({ user }: { user: User }) => {
  const deleteUser = useUsersStore((s) => s.deleteUser);
  const selectUser = useUsersStore((s) => s.selectUser);

  const handleDelete = () => {
    if (window.confirm(`Delete ${user.firstName} ${user.lastName}? This cannot be undone.`)) {
      void deleteUser(user.id);
    }
  };

  return (
    <div className={styles.actions}>
      <Button variant="ghost" size="sm" onClick={() => { selectUser(user); }}>
        Edit
      </Button>
      <Button variant="danger" size="sm" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export const UsersPage = () => {
  const { users, isLoading, error, fetchUsers } = useUsersStore((s) => ({
    users: s.users,
    isLoading: s.isLoading,
    error: s.error,
    fetchUsers: s.fetchUsers,
  }));

  const createModal = useDisclosure();

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Users</h1>
          <p className={styles.subtitle}>{users.length} total users</p>
        </div>
        <Button variant="primary" onClick={createModal.open} data-testid="create-user-btn">
          + Add User
        </Button>
      </div>

      {error && (
        <div role="alert" className={styles.error}>
          {error}
        </div>
      )}

      <Table<User>
        columns={columns}
        data={users}
        keyExtractor={(user) => user.id}
        isLoading={isLoading}
        emptyMessage="No users found. Create your first user."
        caption="User management"
      />

      <Modal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        title="Add New User"
        size="md"
      >
        <CreateUserForm onSuccess={createModal.close} />
      </Modal>
    </div>
  );
};
