'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Separator, Strong, Text } from '@radix-ui/themes';

import packageMeta from '@/../package.json';
import meta from '@/app/meta';

import Search, { searchAtom } from './search';

export default function Sidebar() {
  const [search] = useAtom(searchAtom);
  const pathname = usePathname();

  const renderedMeta = useMemo(() => {
    return Object.keys(meta).reduce((result, key) => {
      if (key.includes(search) || meta[key].title.includes(search)) {
        (result as any)[key] = meta[key];
      }
      return result;
    }, {});
  }, [search, meta]);

  return (
    <div
      className={clsx(
        'flex-none',
        'flex flex-col items-start justify-start w-1/4 max-w-[270px]',
        'py-4 px-2 gap-y-2',
      )}
    >
      <Search />
      <Separator size="4" />
      <div
        className={clsx(
          'w-full grow',
          'flex flex-col items-start justify-start gap-y-2',
        )}
      >
        {Object.keys(renderedMeta).map((key) => {
          const v = meta[key];
          return (
            <Link href={key} key={key} prefetch={true} className="w-full px-2">
              <div
                className={clsx(
                  'w-full px-2 py-1',
                  pathname.slice(1) === key
                    ? 'border-slate-300 bg-slate-100 shadow'
                    : 'border-slate-250 shadow-sm',
                  'border border-solid rounded-md bg-white',
                  'flex flex-row justify-start items-center gap-x-1',
                  'transition-colors duration-200 ease-in-out',
                  'hover:bg-gray-300 hover:border-gray-300 hover:rounded-md',
                )}
              >
                <v.icon className="flex-none h-2/3 mr-2" />
                <Text
                  size={{
                    initial: '1',
                    md: '2',
                  }}
                  className="truncate"
                >
                  {v.title}
                </Text>
              </div>
            </Link>
          );
        })}
      </div>
      <Separator size="4" />
      <div className="w-full px-2 py-1 ">
        <Text as="p" size="1">
          <Strong>
            <Link href="https://github.com/AprilNEA/DevUtils">DevUtils</Link> by{' '}
            <Link href="https://sku.moe" prefetch={true}>
              AprilNEA
            </Link>{' '}
            (v{packageMeta.version})
          </Strong>
        </Text>
      </div>
    </div>
  );
}
