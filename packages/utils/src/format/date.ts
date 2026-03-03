const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const DATETIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  ...DATE_FORMAT_OPTIONS,
  hour: '2-digit',
  minute: '2-digit',
};

export const formatDate = (dateString: string, locale = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, DATE_FORMAT_OPTIONS).format(new Date(dateString));
};

export const formatDateTime = (dateString: string, locale = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, DATETIME_FORMAT_OPTIONS).format(new Date(dateString));
};

export const formatRelativeTime = (dateString: string, locale = 'en-US'): string => {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diff = then - now;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(diff / (1000 * 60));
  const hours = Math.round(diff / (1000 * 60 * 60));
  const days = Math.round(diff / (1000 * 60 * 60 * 24));

  if (Math.abs(seconds) < 60) return rtf.format(seconds, 'second');
  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute');
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour');
  return rtf.format(days, 'day');
};
