import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function GetQuote() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#1E293B]/40' : 'bg-[#F8FAFC]'}`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-[#1E293B]' : 'bg-white'} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`text-4xl font-bold tracking-tight sm:text-5xl ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
            Quote System Temporarily Unavailable
          </h1>
          <p className={`mt-4 text-lg ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Our quote system is currently under maintenance. Please check back soon!
          </p>
          <p className={`mt-4 text-lg ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            For urgent inquiries, please check back later when our quote system is back online.
          </p>
        </div>
      </div>
    </div>
  );
} 