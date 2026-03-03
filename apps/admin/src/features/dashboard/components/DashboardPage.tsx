import { useAuthStore } from '@features/auth/store/auth-store';

import styles from './DashboardPage.module.css';

interface StatCardProps {
  readonly label: string;
  readonly value: string;
  readonly icon: string;
}

const StatCard = ({ label, value, icon }: StatCardProps) => (
  <div className={styles.statCard}>
    <div className={styles.statIcon} aria-hidden="true">{icon}</div>
    <div>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
    </div>
  </div>
);

export const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className={styles.page}>
      <div className={styles.welcome}>
        <h1 className={styles.title}>
          Welcome back, {user?.firstName ?? 'Admin'} 👋
        </h1>
        <p className={styles.subtitle}>
          Here's what's happening in your workspace today.
        </p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Total Users" value="3" icon="👥" />
        <StatCard label="Active Users" value="2" icon="✅" />
        <StatCard label="Pending" value="1" icon="⏳" />
        <StatCard label="Admins" value="1" icon="🛡️" />
      </div>
    </div>
  );
};
