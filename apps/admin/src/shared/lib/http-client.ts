import { storage } from '@repo/utils';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';


const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api';

/**
 * Configured Axios instance with:
 * - Automatic JWT Bearer token injection
 * - 401 → clear session and redirect to login
 * - Consistent base URL from env
 */
export const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const tokens = storage.get<{ accessToken: string }>('auth-tokens');
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      storage.remove('auth-tokens');
      window.location.href = '/login';
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  },
);

export const extractData = <T>(response: AxiosResponse<{ data: T }>): T => response.data.data;
