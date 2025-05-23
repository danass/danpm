'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
// import { usePathname } from 'next/navigation'; // No longer needed as it applies to all paths
import { HomeIcon, BriefcaseIcon } from '@heroicons/react/24/solid';

export default function GlobalHomeLink() { // Renamed component
  // const pathname = usePathname(); // No longer needed
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) { // Disappear after scrolling 50px
            setVisible(false);
          } else {
            setVisible(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial visibility based on scroll position
    if (window.scrollY > 50) {
        setVisible(false);
    } else {
        setVisible(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array, so it runs once on mount and cleans up on unmount

  const linkContainerStyles = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(-20px)',
    pointerEvents: visible ? 'auto' : 'none'
  };

  return (
    <div 
      className={`fixed top-4 left-4 z-50 flex items-center space-x-3 transition-all duration-300 ease-in-out`}
      style={linkContainerStyles}
    >
      <Link
        href="/"
        className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        aria-label="Go to Homepage"
      >
        <HomeIcon className="h-6 w-6" />
      </Link>
      <Link
        href="/#work-portfolio" // Smooth scroll target ID
        className="px-3 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-sm"
        aria-label="Go to Work & Portfolio Section"
      >
        Work & Portfolio
      </Link>
    </div>
  );
} 