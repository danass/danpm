'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const DebugHighlightWrapper = ({ children, componentName = "Unnamed Component" }) => {
  const searchParams = useSearchParams();
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });
  const wrapperRef = useRef(null);

  useEffect(() => {
    setIsDebugMode(searchParams.get('debug') === '1');
  }, [searchParams]);

  useEffect(() => {
    if (isDebugMode && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
        top: rect.top + window.scrollY, // account for scroll
        left: rect.left + window.scrollX,
      });
    }
  }, [isDebugMode, children]); // Re-calculate if children change, affecting size

  const handleMouseEnter = () => {
    if (isDebugMode && wrapperRef.current) {
      setIsHovering(true);
      // Recalculate dimensions on hover in case of dynamic content or layout shifts
      const rect = wrapperRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  const handleMouseLeave = () => {
    if (isDebugMode) {
      setIsHovering(false);
    }
  };

  if (!isDebugMode) {
    return <>{children}</>;
  }

  return (
    <div 
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', border: isHovering ? '2px dashed red' : '1px dotted transparent' }}
    >
      {children}
      {isHovering && (
        <div 
          style={{
            position: 'absolute',
            top: '-25px', // Position above the component
            left: '0px',
            backgroundColor: 'rgba(0,0,0,0.75)',
            color: 'white',
            padding: '3px 6px',
            fontSize: '12px',
            borderRadius: '3px',
            zIndex: 10000, // Ensure it's on top
            whiteSpace: 'nowrap',
          }}
        >
          {componentName} | W: {Math.round(dimensions.width)}px H: {Math.round(dimensions.height)}px
        </div>
      )}
    </div>
  );
};

export default DebugHighlightWrapper; 