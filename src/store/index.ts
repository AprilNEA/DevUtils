import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppStore {
  delay: number;
  setDelay: (delay: number) => void;
  sticky: boolean;
  setSticky: () => Promise<void>;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      delay: 300,
      setDelay: (delay) => set((state) => ({ delay })),
      sticky: false,
      setSticky: async () => {
        // await (
        //   await import('@tauri-apps/api/window')
        // ).appWindow.setAlwaysOnTop(!get().sticky);
        set((state) => ({ sticky: !state.sticky }));
      },
    }),
    {
      name: 'DevUtils',
      version: 1,
    },
  ),
);
