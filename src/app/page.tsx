import clsx from 'clsx';
import Link from 'next/link';

import { Grid } from '@radix-ui/themes';

import { Logo } from '@/icons';

import { META_UTILS } from './meta';

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-center justify-center h-full gap-y-8">
        <div className="flex flex-row items-center justify-center text-4xl font-bold">
          <Logo className="h-16 mr-2" />
          DevUtils
        </div>
        <div className="text-2xl">All-in-one Toolbox for Developers</div>
        <Grid columns="3" gap="4">
          {Object.values(META_UTILS).map((utils) => {
            return (
              <div
                className={clsx(
                  'flex flex-col justify-center items-center gap-4',
                  'p-4 bg-white border shadow rounded-md',
                )}
              >
                <utils.icon className="h-16 w-16" />
                <p>{utils.name}</p>
              </div>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
