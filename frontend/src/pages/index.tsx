import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to todos page if authenticated, otherwise to signin
    // For now, redirect to signin
    router.push('/auth/signin');
  }, [router]);

  return (
    <div className="container bg-white text-blue-600 min-h-screen">
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo application with authentication" />
      </Head>
      <main className="py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Todo App</h1>
          <p className="text-lg text-blue-600">Loading...</p>
        </div>
      </main>
    </div>
  );
}