import JSONFormatValidate from '@/app/json-format-validate/json-fromat-validate';
import { Utils, getWebMeta } from '@/app/meta';

export const metadata = getWebMeta(Utils.JSONFormatValidate);

export default function Page() {
  return <JSONFormatValidate />;
}
