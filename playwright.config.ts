import { defineConfig } from '@playwright/test'

// Browser checks (tests/browser). They run against a production build:
// `npm run build`, then `npm run test:browser` starts `next start` on port
// 3100, or reuses one already running there. Set BASE_URL to check another
// server instead. They use the Chrome installed on this machine, so there is
// no browser download.
const baseURL = process.env.BASE_URL ?? 'http://localhost:3100'

export default defineConfig({
  testDir: 'tests/browser',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL, channel: 'chrome', viewport: { width: 1280, height: 800 } },
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'npx next start -p 3100', url: baseURL, reuseExistingServer: true },
})
