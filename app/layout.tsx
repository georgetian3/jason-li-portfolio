import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Jason Li Portfolio',
  description: 'Jason Li Portfolio',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return <html lang='en'>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen overflow-hidden`}
    >
      {/* header */}
      <header className={`
        mx-auto top-0 z-10 w-full bg-black p-4 text-white text-center text-2xl
      `}>
        Jason Li
      </header>
      <main className="flex-1 my-4 overflow-y-hidden">
        {children}
      </main>
    </body>
  </html>
}
