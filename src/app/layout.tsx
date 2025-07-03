import { BoardProvider } from './context/BoardContext';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Realtime Task Board',
  description: 'Built with Next.js, Socket.IO, and Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BoardProvider>{children}</BoardProvider>
      </body>
    </html>
  );
}
