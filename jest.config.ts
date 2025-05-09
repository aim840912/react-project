import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',              // 使用 ts-jest
    testEnvironment: 'jsdom',       // 模擬瀏覽器環境
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',     // 讓 tsx/ts 檔交給 ts-jest 處理
    },
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',  // Mock CSS
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // 下方要新增
    testMatch: ['<rootDir>/src/**/*.test.(ts|tsx|js)'],
}

export default config
