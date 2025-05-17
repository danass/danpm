import React, { Suspense } from 'react';
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

export default function CaseStudyPage() {
  // This component (page.js) should not use client-side hooks directly if it wraps a Suspense boundary
  // for client components that use those hooks.
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CaseStudyContent />
    </Suspense>
  );
}