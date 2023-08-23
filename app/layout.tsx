import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ToasterContext from './context/ToasterContext';

import './globals.css';
import AuthContext from './context/AuthContext';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger Clone App',
  description: 'Messenger Clone App using next',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
