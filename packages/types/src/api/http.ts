export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly details?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  readonly data: T;
  readonly message?: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  readonly headers?: Record<string, string>;
  readonly params?: Record<string, string | number | boolean | undefined>;
  readonly signal?: AbortSignal;
}
