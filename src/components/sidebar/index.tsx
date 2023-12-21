'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useMemo } from 'react';

import { Separator, Strong, Text } from '@radix-ui/themes';

import packageMeta from '@/../package.json';
import METADATA, { META_UTILS, Utils } from '@/app/meta';

import Search, { searchAtom } from './search';

function SidebarItem({
  href,
  name,
  _icon,
  isActive,
  className,
}: {
  href: string;
  name: string;
  _icon: JSX.ElementType;
  isActive: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={true}
      className={clsx('w-full px-2', className)}
    >
      <div
        className={clsx(
          'w-full px-2 py-1',
          isActive
            ? 'border-slate-300 bg-slate-100 shadow'
            : 'border-slate-250 bg-white shadow-sm',
          'border border-solid rounded-md',
          'flex flex-row justify-start items-center gap-x-1',
          'transition-colors duration-200 ease-in-out',
          'hover:bg-gray-300 hover:border-gray-300 hover:rounded-md ',
        )}
      >
        <_icon
          style={{
            height: '24px',
            width: '24px',
          }}
          className="flex-none mr-2"
        />
        <Text
          size={{
            initial: '1',
            md: '2',
          }}
          className="truncate"
        >
          {name}
        </Text>
      </div>
    </Link>
  );
}

export default function Sidebar() {
  const [search] = useAtom(searchAtom);
  const pathname = usePathname();

  const searchResult = useMemo(() => {
    return Object.keys(META_UTILS).reduce((result, key) => {
      if (
        key.includes(search) ||
        META_UTILS[key as Utils].name.includes(search) ||
        (META_UTILS[key as Utils]?.title ?? '').includes(search) ||
        (META_UTILS[key as Utils]?.description ?? '').includes(search)
      ) {
        (result as any)[key] = META_UTILS[key as Utils];
      }
      return result;
    }, {}) as typeof META_UTILS;
  }, [search, META_UTILS]);

  return (
    <div
      className={clsx(
        'flex-none',
        'flex flex-col items-start justify-start w-1/4 max-w-[270px]',
        'py-4 px-2 gap-y-3',
      )}
    >
      <div className="px-2 space-y-2.5">
        <Link href="/" className="text-2xl font-bold">
          DevUtils
        </Link>
        <Search />
      </div>
      <Separator size="4" />
      <div
        className={clsx(
          'w-full grow',
          'flex flex-col items-start justify-start gap-y-2',
        )}
      >
        {Object.entries(METADATA).map(([categoryKey, category]) => {
          const utils = Object.keys(category.utils);
          const isUtilsActive = utils.some(
            (utilsKey) => pathname === `/utils/${utilsKey}`,
          );
          const isCategoryActive = pathname === `/category/${categoryKey}`;

          return (
            <Fragment key={categoryKey}>
              <SidebarItem
                _icon={category.icon}
                href={`/category/${categoryKey}`}
                name={category.name}
                isActive={isCategoryActive}
              />
              {(isUtilsActive || isCategoryActive) &&
                Object.entries(category.utils).map(([utilsKey, utils]) => (
                  <SidebarItem
                    key={utilsKey}
                    _icon={utils.icon}
                    href={`/utils/${utilsKey}`}
                    name={utils.name}
                    className={clsx('pl-6')}
                    isActive={pathname === `/utils/${utilsKey}`}
                  />
                ))}
            </Fragment>
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
