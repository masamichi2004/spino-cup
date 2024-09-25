// Login.tsx
'use client';

import LoginCard from '@/src/feature/Login/Login';
import Loading from './loading';

export default function StartPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginCard />
    </div>
  );
}
