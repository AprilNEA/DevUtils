import { Utils, getWebMeta } from '@/app/meta';

import { Base64ImageEncodeDecode } from './base64-image-encode-decode';

export const metadata = getWebMeta(Utils.JSONFormatValidate);

export default function Page() {
  return <Base64ImageEncodeDecode />;
}
