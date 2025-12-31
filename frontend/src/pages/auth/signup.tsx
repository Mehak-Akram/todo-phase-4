import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { authService } from '../../services/auth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await authService.signup(email, password);
      router.push('/todos'); // Redirect to todos page after successful signup
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container bg-white text-blue-500 min-h-screen">
      <Head>
        <title>Sign Up - Todo App</title>
        <meta name="description" content="Create an account for Todo App" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 bg-white border border-blue-500 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-500">Create an Account</h1>
            <p className="mt-2 text-blue-300">Sign up to manage your todos</p>
          </div>

          {error && (
            <div className="p-3 text-red-300 bg-red-900 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-500">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-blue-500 bg-white text-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-500">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-blue-500 bg-white text-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-500">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-blue-500 bg-white text-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="text-sm text-center text-blue-300">
            Already have an account?{' '}
            <a
              href="/auth/signin"
              className="font-medium text-blue-300 hover:text-blue-500"
            >
              Sign in
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}