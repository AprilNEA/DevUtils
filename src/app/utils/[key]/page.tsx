import type { Metadata } from 'next';

import { META_UTILS, Utils } from '@/app/meta';

export function generateMetadata({
  params,
}: {
  params: { key: Utils };
}): Metadata {
  const { key } = params;
  return {
    title: `${
      META_UTILS[key]?.title ?? META_UTILS[key]?.name + '  Online Tools'
    } | DevUtils`,
    description: META_UTILS[key]?.description,
  };
}

export async function generateStaticParams() {
  return Object.values(Utils).map((key) => ({
    key: key as Utils,
  }));
}

export default function UtilsPage({ params }: { params: { key: Utils } }) {
  return META_UTILS[params.key].component;
}
