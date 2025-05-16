'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; // Using a simpler icon

export default function ConditionalHomeLink() {
  const pathname = usePathname();

  if (pathname !== '/case-study') {
    return null;
  }

  return (
    <Link
      href="/"
      className="fixed top-4 left-4 z-50 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      aria-label="Back to Home"
    >
      <ArrowLeftIcon className="h-6 w-6" />
    </Link>
  );
} 