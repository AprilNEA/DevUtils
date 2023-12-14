interface TauriCommands {
  validate_json: {
    params: { stringToValidate: string };
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
