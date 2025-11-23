import { ApiError } from "../errors/ApiError";

export interface HttpRequestOptions {
  headers?: Record<string, string>;
}

export interface HttpClient {
  get<T>(url: string, options?: HttpRequestOptions): Promise<T>;
}

export const fetchHttpClient: HttpClient = {
  async get<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    const res = await fetch(url, { headers: options?.headers });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new ApiError(res.status, body);
    }
    return res.json() as Promise<T>;
  },
};
