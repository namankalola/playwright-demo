// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';


const config = ({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,
  expect: {
    timeout: 30000
  },
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure'
        // ...devices['Galaxy A55']
      }
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure'
        // ...devices['Galaxy A55']
      }
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure'
        // ...devices['Galaxy A55']
      }
    }]
});

module.exports = config;