import { expect, test } from '@playwright/test';

/**
 * E2E test: Authentication flow
 *
 * Tests the complete login journey:
 * 1. Unauthenticated user is redirected to /login
 * 2. Invalid credentials show an error
 * 3. Valid credentials log the user in and redirect to /dashboard
 * 4. Logout returns to /login
 */

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure we start unauthenticated by clearing storage
    await page.goto('/');
    await page.evaluate(() => { window.localStorage.clear(); });
  });

  test('redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('shows validation errors for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('login-email').fill('wrong@example.com');
    await page.getByTestId('login-password').fill('wrongpassword');
    await page.getByTestId('login-submit').click();

    const errorAlert = page.getByRole('alert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText(/invalid/i);
  });

  test('successfully logs in with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('login-email').fill('admin@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();

    // Should redirect to dashboard after successful login
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
  });

  test('preserves the intended destination after login', async ({ page }) => {
    // Try to access a protected route while unauthenticated
    await page.goto('/users');
    await expect(page).toHaveURL(/\/login/);

    await page.getByTestId('login-email').fill('admin@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();

    // Should redirect to the originally intended page, not the default dashboard
    await expect(page).toHaveURL(/\/users/);
  });

  test('logout clears session and redirects to /login', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.getByTestId('login-email').fill('admin@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL(/\/dashboard/);

    // Now log out
    await page.getByRole('button', { name: /logout/i }).click();
    await expect(page).toHaveURL(/\/login/);

    // Confirm protected route is no longer accessible
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe('Users page (authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto('/login');
    await page.getByTestId('login-email').fill('admin@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('displays the users table', async ({ page }) => {
    await page.goto('/users');
    await expect(page.getByRole('heading', { name: /users/i })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('can open the create user modal', async ({ page }) => {
    await page.goto('/users');
    await page.getByTestId('create-user-btn').click();
    await expect(page.getByRole('dialog', { name: /add new user/i })).toBeVisible();
  });
});
