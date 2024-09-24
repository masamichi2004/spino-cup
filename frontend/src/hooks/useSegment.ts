'use client';
import { usePathname } from 'next/navigation';

// カスタムフックの作成
const useSegment = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments.pop();
  return { lastSegment, segments };
};

export default useSegment;