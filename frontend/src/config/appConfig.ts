export interface AppConfig {
  apiBaseUrl: string;
}

export function getAppConfig(): AppConfig {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (!apiBaseUrl) throw new Error('Missing VITE_API_BASE_URL env variable');
  return { apiBaseUrl };
}