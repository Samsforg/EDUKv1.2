import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./",
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 60000,
  reporter: [["list"]],
  use: {
    baseURL: process.env.QA_BASE_URL || "https://edukora.net",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    colorScheme: "light",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});