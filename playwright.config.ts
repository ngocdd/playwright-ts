import { defineConfig, devices } from '@playwright/test';

const admin_STORAGE = './utils/auth/admin.json';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  expect: {
    timeout: 1000 * 60, // time out for checking expected
  },
  timeout: 1000*30*5,
  globalTimeout: 1000*60*600, // time out for whole test run
  testMatch: ["**/*.ts"],
  globalSetup: './global.setup.ts', // setup before all test
  // globalTeardown: './global.teardown.ts', // cleanup after all test
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['monocart-reporter', {  
        name: "My Test Report",
        outputFile: './test-results/report.html'
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 1000 * 60 * 5, // time out for each actions
    navigationTimeout: 1000 * 60 * 5, // time out for each navigation cation
    trace: 'on-first-retry',
    headless:true,
    locale: 'en-GB',
    timezoneId: 'Asia/Saigon',
    // storageState: admin_STORAGE,
  },

  /* Configure projects for major browsers */
  projects: [
    // setup project
    { name: 'setup', testMatch: './global.setup.ts'},
    // setup chrome with storage
    {
      name: 'chromium',
      // dependencies: ['setup'],
      use: {
         ...devices['Desktop Chrome'],
        //  storageState: './utils/auth/admin.json'
      },
    },
    

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
