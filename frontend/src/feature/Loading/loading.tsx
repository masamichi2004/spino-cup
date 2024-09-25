'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export function LoadingComp() {
  const [brightness, setBrightness] = useState(100);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBrightness((prev) => {
        if (prev >= 150) setDirection(-5);
        if (prev <= 50) setDirection(5);
        return prev + direction;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div
        className="relative w-64 h-64"
        style={{
          filter: `brightness(${brightness}%)`,
          transition: 'filter 0.05s ease-in-out',
        }}
      >
        <Image
          src="/meramera7-1.png"
          alt="Flame icon"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="mt-1 text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  );
}
