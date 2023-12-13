import Link from 'next/link';

import { Logo } from '@/icons';

import meta from './meta';

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-center justify-center h-full gap-y-4">
        <div className="flex flex-row items-center justify-center text-4xl font-bold">
          <Logo className="h-16 mr-2" />
          DevUtils
        </div>
        <div className="text-2xl">All-in-one Toolbox for Developers</div>
      </div>
    </div>
  );
}
