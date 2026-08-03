/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: [
    "src/lib/auth.ts",
    "src/lib/ligue.ts",
    "src/lib/live-prof.ts",
    "src/lib/rate-limit.ts",
    "src/lib/validation.ts",
  ],
};
