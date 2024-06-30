/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GOOGLE_SHEETS_SERVICE_CLIENT_EMAIL: string
  readonly GOOGLE_SHEETS_SERVICE_CLIENT_PRIVATE_KEY: string
  readonly GOOGLE_SHEETS_SPREADSHEET_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
