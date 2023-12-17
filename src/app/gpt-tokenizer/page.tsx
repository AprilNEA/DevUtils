import { GptTokenizer } from '@/app/gpt-tokenizer/gpt-tokenizer';
import { Utils, getWebMeta } from '@/app/meta';

export const metadata = getWebMeta(Utils.GptTokenizer);

export default function Page() {
  return <GptTokenizer />;
}
