'use client';

import { atom, useAtom } from 'jotai';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/input';

export const searchAtom = atom('');

export default function Search() {
  const [search, setSearch] = useAtom(searchAtom);
  return (
    <Input
      icon={<MagnifyingGlassIcon height="16" width="16" />}
      rootClassName="w-full"
      placeholder="Search …"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
