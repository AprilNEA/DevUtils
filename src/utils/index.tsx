import 'client-only';

import { readText } from '@tauri-apps/api/clipboard';

export const isTauri = () => '__TAURI__' in window;

export async function readClipBoard(): Promise<string> {
  if (isTauri()) {
    return (await readText()) ?? '';
  }
  if ('clipboard' in navigator) {
    return await navigator.clipboard.readText();
  }
  return '';
}
