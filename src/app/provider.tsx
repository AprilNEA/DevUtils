'use client';

import { Provider as JotaiProvider, getDefaultStore } from 'jotai';

const defaultStore = getDefaultStore();
const Provider = ({ children }: { children: React.ReactNode }) => (
  <JotaiProvider store={defaultStore}>{children}</JotaiProvider>
);

export default Provider;
