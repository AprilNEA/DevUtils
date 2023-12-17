import { Base64StringEncodeDecode } from '@/app/base64-string-encode-decode/base64-string-encode-decode';
import { Utils, getWebMeta } from '@/app/meta';

export const metadata = getWebMeta(Utils.Base64StringEncodeDecode);

export default function Page() {
  return <Base64StringEncodeDecode />;
}
