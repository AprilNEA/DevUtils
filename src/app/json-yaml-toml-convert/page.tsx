import { JsonYamlTomlConvert } from '@/app/json-yaml-toml-convert/json-yaml-toml-convert';
import { Utils, getWebMeta } from '@/app/meta';

export const metadata = getWebMeta(Utils.jsonYamlTomlConverter);

export default function Page() {
  return <JsonYamlTomlConvert />;
}
