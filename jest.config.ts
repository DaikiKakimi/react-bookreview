import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/tests/**/*.test.tsx"], // Jestが実行するテストファイルのパターンを指定
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/playwright/"], // Jestが無視するテストファイルのパターンを指定
  preset: "ts-jest",
};

export default config;
