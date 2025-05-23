'use client'
import React, { Suspense, useState } from 'react';
import CaseStudyContent from './CaseStudyContent'; // This will have 'use client' and useSearchParams

// Define a fallback component for Suspense
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading Case Study...</p>
      {/* You could add a more sophisticated skeleton loader here */}
    </div>
  );
}

function PasswordProtection({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/validate-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (data.valid) {
        onUnlock();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Protected Content</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm">Incorrect password. Please try again.</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Unlock Content'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CaseStudyPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return <PasswordProtection onUnlock={() => setIsUnlocked(true)} />;
  }

  // This component (page.js) should not use client-side hooks directly if it wraps a Suspense boundary
  // for client components that use those hooks.
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CaseStudyContent />
    </Suspense>
  );
}