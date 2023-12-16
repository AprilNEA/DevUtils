import { Utils, getWebMeta } from '@/app/meta';
import UnixTimeConverter from '@/app/unix-time-converter/unix-time-converter';

export const metadata = getWebMeta(Utils.UnixTimeConverter);

export default function Page() {
  return <UnixTimeConverter />;
}
