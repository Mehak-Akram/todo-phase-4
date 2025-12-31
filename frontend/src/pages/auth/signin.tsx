import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { authService } from '../../services/auth';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.signin(email, password);
      router.push('/todos'); // Redirect to todos page after successful signin
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container bg-white text-blue-500 min-h-screen">
      <Head>
        <title>Sign In - Todo App</title>
        <meta name="description" content="Sign in to Todo App" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 bg-white border border-blue-500 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-500">Sign In</h1>
            <p className="mt-2 text-blue-300">Access your todo list</p>
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
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="text-sm text-center text-blue-300">
            Don't have an account?{' '}
            <a
              href="/auth/signup"
              className="font-medium text-blue-300 hover:text-blue-500"
            >
              Sign up
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}