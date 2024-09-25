import type { Metadata } from 'next';
import Header from '../feature/Header/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'MachoHub',
  description: '筋トレしましょう。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
