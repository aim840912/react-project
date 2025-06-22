// src/test/setup.ts (修改後)
import '@ant-design/v5-patch-for-react-19';
import '@testing-library/jest-dom';
import '../i18n';
import { vi } from 'vitest';
import { server } from '../mocks/server'; // <--- 匯入全域 server

// 在所有測試開始前，啟動伺服器
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// 在每個測試結束後，重置所有 handler，避免測試間互相影響
afterEach(() => server.resetHandlers());

// 在所有測試結束後，關閉伺服器
afterAll(() => server.close());


// 模擬瀏覽器 API
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', ResizeObserverMock);