interface ImportMetaEnv {
    readonly VITE_APP_ACCESS_TOKEN: string;
    readonly VITE_APP_PLOTNO_API_KEY: string;
    // Add other environment variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }