import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Layout = () => {
  const location = useLocation();
  const { isDark, toggleDarkMode } = useTheme();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/best-method', label: 'Best Method' },
    { path: '/calculator', label: 'Full Calculator' },
    { path: '/quote', label: 'Get a Quote' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0F172A]' : 'bg-[#F1F5F9]'} transition-colors`}>
      <nav className={`${isDark ? 'bg-[#1E293B]' : 'bg-[#1E293B]'} shadow-lg`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${location.pathname === item.path
                      ? 'bg-[#00E5FF] text-[#1E293B]'
                      : `text-[#F1F5F9] hover:bg-[#64748B] hover:text-[#F1F5F9] ${isDark ? 'hover:bg-[#334155]' : ''}`
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-[#F1F5F9] hover:bg-[#64748B] transition-colors"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 