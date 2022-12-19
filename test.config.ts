import { PlaywrightTestConfig } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./global-setup"),
  testDir: "./test",
  /* Maximum time one test can run for. 0 means no timeout */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10 * 1000, // 10s
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* By default, test files are run in parallel. Tests in a single file are run in order, in the same worker process. */
  fullyParallel: true,
  /* Take up maximum number of available workers*/
  workers: undefined,
  /*
   * Reporter to use. See https://playwright.dev/docs/test-reporters
   * Instead of having it open automatically, run `npm run show-report` when you need to.
   */
  reporter: [["html", { open: "never" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // headless: false, // helpful for troubleshooting
    /* Required for local server */
    ignoreHTTPSErrors: true,
    /* Required for local server */
    bypassCSP: true,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 30 * 1000, // 30s
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://localhost:3000",
    video: "retry-with-video",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retry-with-trace",
    /** A longer navigation timeout due to some slow loading pages */
    navigationTimeout: 30 * 1000, // 30s
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Widescreen",
      use: {
        browserName: "chromium",
        // Test against Chrome Beta channel.
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",

  /* Run your local dev server before starting the tests */
  webServer: {
    ignoreHTTPSErrors: true,
    reuseExistingServer: !process.env.CI,
    cwd: ".",
    command: "npm run wait-n-start-with-child",
    timeout: 300 * 1000,
    port: 3000,
  },
};

export default config;
