'use client';

import { useState } from 'react';
import { type CreateUserDto, CreateUserSchema } from '@repo/contracts';
import { publicWebEnv } from '@repo/env/web';

type FormState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | { status: 'error'; errors: Record<string, string[]> };

/**
 * Client component demonstrating contract-first form validation.
 * Validates the form with the shared Zod schema BEFORE sending to the API.
 */
export function CreateUserForm(): React.JSX.Element {
  const [state, setState] = useState<FormState>({ status: 'idle' });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setState({ status: 'loading' });

    const formData = new FormData(e.currentTarget);
    const raw = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role') ?? 'CLIENT',
    };

    // Client-side validation with the shared contract schema
    const result = CreateUserSchema.safeParse(raw);
    if (!result.success) {
      const errors = result.error.issues.reduce<Record<string, string[]>>((acc, issue) => {
        const key = issue.path.join('.') || 'root';
        return { ...acc, [key]: [...(acc[key] ?? []), issue.message] };
      }, {});
      setState({ status: 'error', errors });
      return;
    }

    const dto: CreateUserDto = result.data;

    try {
      const res = await fetch(`${publicWebEnv.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });

      if (!res.ok) {
        const body = (await res.json()) as { error?: { message?: string } };
        setState({ status: 'error', errors: { root: [body.error?.message ?? 'Unknown error'] } });
        return;
      }

      setState({ status: 'success', message: 'Account created successfully!' });
    } catch {
      setState({ status: 'error', errors: { root: ['Network error. Please try again.'] } });
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)}>
      <h2>Create Account</h2>
      {state.status === 'error' && (
        <ul>
          {Object.entries(state.errors).map(([field, msgs]) =>
            msgs.map((msg) => (
              <li key={`${field}-${msg}`}>
                {field}: {msg}
              </li>
            )),
          )}
        </ul>
      )}
      {state.status === 'success' && <p>{state.message}</p>}
      <input name="name" type="text" placeholder="Full name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit" disabled={state.status === 'loading'}>
        {state.status === 'loading' ? 'Creating...' : 'Create Account'}
      </button>
    </form>
  );
}
