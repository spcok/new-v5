import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Mail, Lock } from 'lucide-react';
import { useAuthStore } from '../features/auth/authStore';
import { usePowerSync } from '@powersync/react';
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: Login,
});

const emailSchema = z.string().email('Invalid email address');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const powersync = usePowerSync();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setAuthError(null);
      try {
        const result = await powersync.getAll('SELECT * FROM users WHERE email = ?', [value.email]);
        if (result.length > 0) {
          login(result[0].name, result[0].initials);
          navigate({ to: '/' });
        } else {
          setAuthError('Access Denied: User not found in local vault. Please check your connection or wait for sync.');
          return;
        }
      } catch (error) {
        setAuthError('Database query failed. Please try again.');
        return;
      }
    },
  });

  return (
    <div className="bg-[#0f1115] min-h-screen flex items-center justify-center p-8 font-sans">
      <div className="bg-[#1c1f26] border border-zinc-800 p-8 rounded-xl shadow-2xl flex flex-col w-full max-w-sm relative">
        <img src="/logo.png" alt="KOA Logo" className="w-20 h-20 mx-auto mb-6 object-contain" />
        
        <div className="flex flex-col gap-1 text-center mb-8">
          <h1 className="text-2xl font-black tracking-tight text-white">System Authorization</h1>
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
            Kent Owl Academy V5
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const result = emailSchema.safeParse(value);
                return result.success ? undefined : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Operator Email"
                    className="bg-[#111318] text-zinc-200 text-sm w-full pl-10 pr-4 py-3 rounded border border-zinc-800 focus:border-[#3b5b88] focus:ring-1 focus:ring-[#3b5b88] focus:outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>
                {field.state.meta.errors.length > 0 ? (
                  <span className="text-[10px] text-red-400 font-mono px-1">
                    {field.state.meta.errors.join(', ')}
                  </span>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                const result = passwordSchema.safeParse(value);
                return result.success ? undefined : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="password"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Passphrase"
                    className="bg-[#111318] text-zinc-200 text-sm w-full pl-10 pr-4 py-3 rounded border border-zinc-800 focus:border-[#3b5b88] focus:ring-1 focus:ring-[#3b5b88] focus:outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>
                {field.state.meta.errors.length > 0 ? (
                  <span className="text-[10px] text-red-400 font-mono px-1">
                    {field.state.meta.errors.join(', ')}
                  </span>
                ) : null}
              </div>
            )}
          </form.Field>

          {authError && (
            <div className="text-center mt-2">
              <span className="text-rose-500 text-sm font-medium">{authError}</span>
            </div>
          )}

          <form.Subscribe
             selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="mt-2 bg-[#3b5b88] hover:bg-[#4a72aa] disabled:bg-zinc-800 disabled:text-zinc-500 text-white w-full py-3 rounded font-bold font-mono text-xs uppercase tracking-widest transition-colors"
              >
                {isSubmitting ? 'Authenticating...' : 'Login'}
              </button>
            )}
          </form.Subscribe>
        </form>

        <p className="text-center text-[10px] text-zinc-600 mt-8 leading-relaxed max-w-xs mx-auto">
          Warning: Unauthorized access to this system is strictly prohibited under the{' '}
          <span className="text-zinc-500 font-semibold">Computer Misuse Act 1990</span>. All activity is logged.
        </p>
      </div>
    </div>
  );
}
