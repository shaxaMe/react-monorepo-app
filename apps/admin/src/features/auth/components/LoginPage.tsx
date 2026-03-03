import { Button, Input } from '@repo/ui';

import { useLogin } from '../hooks/use-login';

import styles from './LoginPage.module.css';

export const LoginPage = () => {
  const { formState, isLoading, error, handleChange, handleSubmit } = useLogin();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.logo} aria-hidden="true">⬡</span>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to your admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.fields}>
            <Input
              type="email"
              label="Email address"
              placeholder="admin@example.com"
              value={formState.email}
              onChange={handleChange('email')}
              required
              autoComplete="email"
              autoFocus
              data-testid="login-email"
            />
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={formState.password}
              onChange={handleChange('password')}
              required
              autoComplete="current-password"
              data-testid="login-password"
            />
          </div>

          {error && (
            <div role="alert" className={styles.errorAlert}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className={styles.submitButton}
            data-testid="login-submit"
          >
            Sign in
          </Button>
        </form>

        <p className={styles.hint}>
          Demo credentials: <code>admin@example.com</code> / <code>password123</code>
        </p>
      </div>
    </div>
  );
};
