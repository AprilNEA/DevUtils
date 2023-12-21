import clsx from 'clsx';
import { Metadata } from 'next';

import { Grid, Heading, Text } from '@radix-ui/themes';

import METADATA, { Categories } from '@/app/meta';

export function generateMetadata({
  params,
}: {
  params: { key: Categories };
}): Metadata {
  const { key } = params;
  return {
    title: `${METADATA[key]?.name} Online Tools | DevUtils`,
    // description: METADATA[key]?.description,
  };
}

export async function generateStaticParams() {
  return Object.values(Categories).map((key) => ({
    key: key as Categories,
  }));
}

export default function Category({
  params,
}: {
  params: {
    key: Categories;
  };
}) {
  const category = METADATA[params.key];
  return (
    <div className="px-8 space-y-8">
      <Heading>{category.name}</Heading>
      <Grid columns="3" gap="4">
        {Object.values(category.utils).map((utils) => {
          return (
            <div
              key={utils.name}
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
  );
}
