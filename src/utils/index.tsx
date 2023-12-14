import { readText } from '@tauri-apps/api/clipboard';

export const isTauri = () => window.__TAURI__ !== undefined;

export async function readClipBoard(): Promise<string> {
  if (isTauri()) {
    return (await readText()) ?? '';
  }
  return await navigator.clipboard.readText();
}
