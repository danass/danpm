'use client';

import React from 'react';

export function Separator({ className }) {
  return <hr className={`my-8 border-gray-200 dark:border-gray-700 ${className || ''}`} />;
}

export default Separator; 