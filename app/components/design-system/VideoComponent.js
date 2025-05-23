'use client';

import React from 'react';

export default function VideoComponent({ src, className = "", autoPlay = true, muted = true, loop = true, playsInline = true, controls = true }) {
  return (
    <div className={`aspect-video w-full rounded-xl overflow-hidden ${className}`}>
      <video
        src={src}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        className="w-full h-full object-cover"
      />
    </div>
  );
} 