/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '../../server/data/store.js' {
  export const ALL_INITIAL_STUDENTS: any[];
  export const INITIAL_DRIVES: any[];
  export const INITIAL_APPLICATIONS: any[];
  export const INITIAL_APPLICATION_HISTORY: any[];
  export const NO_DUES_CATEGORIES: any[];
  export function generateInitialNoDuesMap(students?: any[]): Record<string, any>;
  export const dbStore: any;
}
