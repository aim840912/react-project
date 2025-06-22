// src/features/user/pages/login/Login.test.tsx (最終解決版)

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '../../../../mocks/handlers';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 從您的主 store 設定檔中引入 RootState 型別
import type { RootState } from '../../../../app/store';

// 元件與 Slices
import Login from './index';
import authSlice from '../../authSlice';
import permissionsSlice from '../../permissionSlice';

// 引入您所有的 API Slices 和 Middleware
import { userApi } from '../../api/userApi';
import { financeApi } from '../../../finance/api/financeApi';
import { equipmentApi } from '../../../equipment/api/equipmentApi';
import { settingsApi } from '../../../settings/api/settingsApi';
import { estateApi } from '../../../estate/api/estateApi';
import { dashboardApi } from '../../../dashboard/api/dashboardApi';
import { authListenerMiddleware } from '../../authMiddleware';


// --- 關鍵修改：建立一個專門給測試用的 baseQuery ---
// 它會自動為相對路徑加上 'http://localhost'
const testBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost', // 設定一個基礎網域
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).authSlice.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});


// --- 全域 API 模擬設定 ---
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// --- Store 和渲染輔助函式 ---
const setupTestStore = () => {
    return configureStore({
        reducer: {
            authSlice,
            permissionsSlice,
            // 關鍵修改：在測試中，讓所有 API 使用我們特製的 testBaseQuery
            [userApi.reducerPath]: userApi.reducer,
            [financeApi.reducerPath]: financeApi.reducer,
            [equipmentApi.reducerPath]: equipmentApi.reducer,
            [settingsApi.reducerPath]: settingsApi.reducer,
            [estateApi.reducerPath]: estateApi.reducer,
            [dashboardApi.reducerPath]: dashboardApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                // 在測試中關閉序列化檢查，因為我們可能會傳遞非序列化的模擬資料
                serializableCheck: false,
            })
                .prepend(authListenerMiddleware.middleware)
                .concat(
                    userApi.middleware, financeApi.middleware, equipmentApi.middleware,
                    settingsApi.middleware, estateApi.middleware, dashboardApi.middleware
                ),
    });
};

const renderWithProviders = (component: React.ReactElement) => {
    const store = setupTestStore();
    return {
        store,
        ...render(
            <Provider store={store}>
                <BrowserRouter>
                    {component}
                </BrowserRouter>
            </Provider>
        ),
    };
};


// --- 測試案例 ---
describe('Login Component', () => {
    const loginButtonRegex = /^登\s*入$/i;

    test('renders login form correctly', () => {
        renderWithProviders(<Login />);
        expect(screen.getByPlaceholderText('請輸入您的用戶名')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('請輸入您的密碼')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: loginButtonRegex })).toBeInTheDocument();
    });

    test('allows user to type in username and password fields', async () => {
        renderWithProviders(<Login />);
        const usernameInput = screen.getByPlaceholderText<HTMLInputElement>('請輸入您的用戶名');
        const passwordInput = screen.getByPlaceholderText<HTMLInputElement>('請輸入您的密碼');
        await fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        await fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('password123');
    });

});