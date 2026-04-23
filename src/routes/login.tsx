import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../features/auth/authStore';
import { supabase } from '../features/db/supabase';

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
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setAuthError(null);
      setIsAuthenticating(true);

      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      });

      if (signInError) {
        setAuthError(signInError.message);
        setIsAuthenticating(false);
        return;
      }

      // Fetch user profile from the users table based on email
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('name, initials')
        .eq('email', value.email)
        .single();

      // Proceed even if profile fetch fails, falling back to generics
      const userName = profileData?.name || 'Keeper';
      const userInitials = profileData?.initials || 'XX';

      login(userName, userInitials);
      setIsAuthenticating(false);
      navigate({ to: '/' });
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

        {authError && (
          <div className="p-3 mb-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs text-center">
            {authError}
          </div>
        )}

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

          <form.Subscribe
             selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isAuthenticating}
                className="mt-4 bg-[#3b5b88] hover:bg-[#4a72aa] disabled:bg-zinc-800 disabled:text-zinc-500 text-white w-full py-3 rounded font-bold font-mono text-xs uppercase tracking-widest transition-colors"
              >
                {isAuthenticating ? 'AUTHENTICATING...' : 'Login'}
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
