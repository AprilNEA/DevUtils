'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Separator } from '@radix-ui/themes';

import meta from '@/app/meta';

import Search from './search';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        'flex-none',
        'flex flex-col items-start justify-start w-1/4',
        'py-4 px-2 gap-y-2',
      )}
    >
      <Search />
      <Separator size="4" />
      {Object.keys(meta).map((key) => {
        const v = meta[key];
        return (
          <Link href={key} key={key} prefetch={true} className="w-full px-2">
            <div
              className={clsx(
                'w-full px-2 py-1',
                pathname.slice(1) === key &&
                  'border border-solid border-gray-200 bg-gray-200 rounded-md',
                'flex flex-row justify-start items-center gap-x-1',
              )}
            >
              <v.icon className="flex-none h-2/3" />
              <span className="truncate text-base sm:text-sm xs:text-xs">
                {v.title}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
