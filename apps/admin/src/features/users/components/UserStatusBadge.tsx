import type { UserStatus } from '@repo/types';

import styles from './UserStatusBadge.module.css';

interface UserStatusBadgeProps {
  readonly status: UserStatus;
}

const STATUS_CONFIG: Record<UserStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'active' },
  inactive: { label: 'Inactive', className: 'inactive' },
  pending: { label: 'Pending', className: 'pending' },
};

export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <span className={[styles.badge, styles[config.className]].join(' ')}>
      <span className={styles.dot} aria-hidden="true" />
      {config.label}
    </span>
  );
};
