import JWTDebugger from '@/app/jwt-debugger/jwt-debugger';
import { Utils, getWebMeta } from '@/app/meta';

export const metadata = getWebMeta(Utils.JwtDebugger);

export default function Page() {
  return <JWTDebugger />;
}
