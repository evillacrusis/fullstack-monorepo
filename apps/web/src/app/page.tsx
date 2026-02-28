import { publicWebEnv } from '@repo/env/web';

/**
 * Server Component — runs only on the server.
 * Safe to use publicWebEnv here since it only contains NEXT_PUBLIC_* vars.
 */
export default function HomePage(): React.JSX.Element {
  return (
    <main>
      <h1>Welcome to {publicWebEnv.NEXT_PUBLIC_APP_NAME}</h1>
      <p>Environment: {publicWebEnv.NEXT_PUBLIC_APP_ENV}</p>
    </main>
  );
}
