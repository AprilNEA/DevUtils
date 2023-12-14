import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppStore {
  delay: number;
  setDelay: (delay: number) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      delay: 300,
      setDelay: (delay) => set((state) => ({ delay })),
    }),
    {
      name: 'DevUtils',
      version: 1,
    },
  ),
);
