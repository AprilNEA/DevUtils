import clsx from 'clsx';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inconsolata } from 'next/font/google';

import { Separator, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import Sidebar from '@/components/sidebar';
import '@/globals.css';

const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inconsolata',
});

const Toaster = dynamic(
  async () => ({
    default: (await import('react-hot-toast')).Toaster,
  }),
  { ssr: false },
);

export const metadata: Metadata = {
  title: 'DevUtils',
  description: 'All-in-one Toolbox for Developers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={clsx(inconsolata.className, 'h-full bg-[#f3f5f8]')}>
        <Theme accentColor="gray" grayColor="slate" className="h-full">
          <div className="h-full flex flex-row">
            <Sidebar />
            <Separator orientation="vertical" size="4" />
            <div className="grow p-4">{children}</div>
          </div>
        </Theme>
        <Toaster />
      </body>
    </html>
  );
}
