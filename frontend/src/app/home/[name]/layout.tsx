import Header from '@/src/feature/Header/Header'
import React from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <Header />
      </div>
      {children}
    </div>
  );
}
