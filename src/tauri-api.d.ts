interface TauriCommands {
  validate_json: {
    params: { stringToValidate: string; path?: string };
    result: string;
  };
}

declare interface Window {
  __TAURI__?: {
    invoke<K extends keyof TauriCommands>(
      command: K,
      args: TauriCommands[K]['params'],
    ): Promise<TauriCommands[K]['result']>;
  };
}

declare module '@tauri-apps/api' {
  declare function invoke<K extends keyof TauriCommands>(
    command: K,
    args: TauriCommands[K]['params'],
  ): Promise<TauriCommands[K]['result']>;
}
