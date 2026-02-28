export { apiEnv } from './api.env';
export type { ApiEnv } from './api.env';

// webEnv is NOT exported from the root barrel intentionally —
// the web app imports it directly via @repo/env/web to prevent
// the API from eagerly instantiating NEXT_PUBLIC_* validation.

export { validateEnv } from './validate';
