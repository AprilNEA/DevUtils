'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Inconsolata } from 'next/font/google';

import { Separator, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import Sidebar from '@/components/sidebar';
import '@/globals.css';
import { isTauri } from '@/utils';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="description" content="All-in-one Toolbox for Developers" />
        <title>DevUtils</title>
      </head>
      <body className={clsx(inconsolata.className, 'h-full')}>
        <Theme
          accentColor="gray"
          grayColor="slate"
          className="h-full"
          scaling={isTauri() ? '90%' : '100%'}
        >
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
