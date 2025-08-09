/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BET_BASE_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// SVG imports
declare module "*.svg" {
  const content: string;
  export default content;
}

// CSS imports
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

// Global types for testing
declare global {
  var global: typeof globalThis;
}
