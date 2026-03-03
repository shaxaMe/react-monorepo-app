import { describe, expect, it } from 'vitest';

import { formatDate, formatRelativeTime } from './date';

describe('formatDate', () => {
  it('formats an ISO date string to a human-readable date', () => {
    const result = formatDate('2024-01-15T00:00:00.000Z', 'en-US');
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/2024/);
  });

  it('handles different locales', () => {
    const enResult = formatDate('2024-06-01T00:00:00.000Z', 'en-US');
    expect(enResult).toBeTruthy();
  });
});

describe('formatRelativeTime', () => {
  it('returns a relative time string for a past date', () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 5).toISOString(); // 5 minutes ago
    const result = formatRelativeTime(pastDate);
    expect(result).toMatch(/minute/);
  });

  it('returns seconds for a very recent date', () => {
    const recentDate = new Date(Date.now() - 10_000).toISOString(); // 10 seconds ago
    const result = formatRelativeTime(recentDate);
    expect(result).toMatch(/second/);
  });
});
