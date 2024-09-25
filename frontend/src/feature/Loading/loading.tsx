'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export function LoadingComp() {
  const [dotCount, setDotCount] = useState(1); // ドットの数を管理

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev < 3 ? prev + 1 : 1)); // 1個、2個、3個、1個にループ
    }, 500); // 0.3秒ごとにドットの数を更新

    return () => clearInterval(interval); // コンポーネントのアンマウント時にクリーンアップ
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="relative w-64 h-64">
        <Image
          src="/meramera7-1.png"
          alt="Flame icon"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="mt-1 text-lg font-semibold text-gray-700">
        Loading{'.'.repeat(dotCount)}
      </p>
    </div>
  );
}
