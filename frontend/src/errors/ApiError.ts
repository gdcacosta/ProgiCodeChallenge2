export class ApiError extends Error {
  constructor(public status: number, public body?: string) {
    super(`API Error (${status})${body ? ': ' + body.slice(0, 200) : ''}`);
    this.name = 'ApiError';
  }
}