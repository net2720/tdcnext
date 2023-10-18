import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TDCNext',
  description: `Netpo's toy project "Todo-list Calendar"`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <h1 className="main">
          <Link href="/">My Todo-list</Link>
        </h1>
        {children}
      </body>
    </html>
  );
}
