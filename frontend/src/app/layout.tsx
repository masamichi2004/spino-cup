import type { Metadata } from 'next';
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.jpg"></link>
        <meta name="theme-color" content="#FFFEFA" />
      </head>
      <body>{children}</body>
    </html>
  );
}
