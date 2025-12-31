import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authService } from '../../services/auth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Set isClient to true on mount to ensure client-side rendering
    setIsClient(true);
    // Update authentication status after component mounts
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleSignOut = () => {
    authService.signout();
    router.push('/auth/signin');
  };

  const navLinks = isAuthenticated
    ? [
        { name: 'Todos', href: '/todos' },
        { name: 'Profile', href: '/' },
      ]
    : [
        { name: 'Sign In', href: '/auth/signin' },
        { name: 'Sign Up', href: '/auth/signup' },
      ];

  return (
    <nav className="bg-white text-blue-600 shadow-md border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={isClient && isAuthenticated ? '/todos' : '/'}>
              <span className="text-xl font-extrabold cursor-pointer text-blue-600">Todo App</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isClient ? (
                  navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <span
                        className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                          router.pathname === link.href
                            ? 'bg-blue-600 text-white'
                            : 'text-blue-600 hover:bg-blue-100 hover:text-blue-800'
                        }`}
                      >
                        {link.name}
                      </span>
                    </Link>
                  ))
                ) : (
                  // Render a placeholder during SSR to prevent hydration mismatch
                  <div className="px-3 py-2 rounded-md text-sm font-medium text-blue-600">Loading...</div>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block flex items-center space-x-8">
            {isClient && isAuthenticated && (
              <button
                onClick={handleSignOut}
                className="px-4  text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 mb-3 min-w-[90px] h-[38px]"
              >
                Sign Out
              </button>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-blue-200">
            {isClient ? (
              <>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                        router.pathname === link.href
                          ? 'bg-blue-600 text-white'
                          : 'text-blue-600 hover:bg-blue-100 hover:text-blue-800'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  GitHub
                </a>
                {isAuthenticated && (
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 min-w-[90px]"
                  >
                    Sign Out
                  </button>
                )}
              </>
            ) : (
              // Render placeholder during SSR
              <div className="px-3 py-2 rounded-md text-base font-medium text-blue-600">Loading...</div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;