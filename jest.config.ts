import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      { tsconfig: "<rootDir>/tsconfig.jest.json" },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/tests/Login.test.tsx"], // ログインコンポーネントのテストのみを実行
  modulePathIgnorePatterns: ["<rootDir>/src/const.ts"], // const.ts をテストから除外
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/playwright/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  globals: {
    "ts-jest": {
      isolatedModules: true, // これを追加
    },
  },
};

export default config;
