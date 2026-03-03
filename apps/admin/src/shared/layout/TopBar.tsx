import { useAuthStore } from '@features/auth/store/auth-store';
import { Button, useTheme } from '@repo/ui';

import styles from './TopBar.module.css';

export const TopBar = () => {
  const { resolvedScheme, setColorScheme } = useTheme();
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const toggleTheme = () => {
    setColorScheme(resolvedScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.left} />
      <div className={styles.right}>
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={`Switch to ${resolvedScheme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {resolvedScheme === 'dark' ? '☀️' : '🌙'}
        </button>
        {user && (
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {user.firstName} {user.lastName}
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
