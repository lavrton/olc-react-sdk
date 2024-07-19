interface ImportMetaEnv {
    readonly VITE_APP_ACCESS_TOKEN: string;
    readonly VITE_APP_PLOTNO_API_KEY: string;
    readonly VITE_APP_BASIC_AUTH_USERNAME: string;
    readonly VITE_APP_BASIC_AUTH_PASSWORD: string;
    // Add other environment variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }