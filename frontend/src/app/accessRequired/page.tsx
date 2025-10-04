"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation';

const AccessRequired: React.FC = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900/70 to-blue-900/70 backdrop-blur-md">
      <div className="animate-fade-in-down text-center p-8 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white animate-pulse">
          Access Required
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl mb-10 text-gray-200 animate-fade-in">
          Please sign in to access ERP
        </p>
        <button
          onClick={handleSignIn}
          className="group relative px-8 py-4 text-xl font-semibold text-white bg-blue-600/80 rounded-full overflow-hidden transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 backdrop-blur-sm"
        >
          <span className="relative z-10">Sign In</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
    </div>
  );
};

export default AccessRequired;
