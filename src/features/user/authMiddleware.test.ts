// src/features/user/authMiddleware.test.ts

import { configureStore } from '@reduxjs/toolkit';
import { authListenerMiddleware } from './authMiddleware';
import authSlice, { setAuth, logout } from './authSlice';

// 使用 Vitest 來模擬 sessionStorage
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

// 建立一個包含中介軟體的 minimal store
const createTestStore = () => {
    return configureStore({
        reducer: {
            authSlice,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().prepend(authListenerMiddleware.middleware),
    });
};

describe('authListenerMiddleware', () => {

    // 每個測試後清除模擬的呼叫紀錄
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('當 dispatch setAuth action 時，應將 token, username 和 btnAuth 存入 sessionStorage', () => {
        const store = createTestStore();
        const payload = {
            token: 'test-token',
            username: 'test-user',
            btnAuth: ['read', 'write'],
        };

        store.dispatch(setAuth(payload));

        // 驗證 sessionStorage.setItem 是否被正確呼叫
        expect(setItemSpy).toHaveBeenCalledTimes(3);
        expect(setItemSpy).toHaveBeenCalledWith('token', payload.token);
        expect(setItemSpy).toHaveBeenCalledWith('username', payload.username);
        expect(setItemSpy).toHaveBeenCalledWith('btnAuth', JSON.stringify(payload.btnAuth));
    });

    test('當 dispatch logout action 時，應從 sessionStorage 移除 token, username 和 btnAuth', () => {
        const store = createTestStore();

        // 初始先設定一個登入狀態
        sessionStorage.setItem('token', 'old-token');
        sessionStorage.setItem('username', 'old-user');

        store.dispatch(logout());

        // 驗證 sessionStorage.removeItem 是否被正確呼叫
        expect(removeItemSpy).toHaveBeenCalledTimes(3);
        expect(removeItemSpy).toHaveBeenCalledWith('token');
        expect(removeItemSpy).toHaveBeenCalledWith('username');
        expect(removeItemSpy).toHaveBeenCalledWith('btnAuth');
    });

    test('當 dispatch 一個不相關的 action 時，不應觸發 sessionStorage 操作', () => {
        const store = createTestStore();

        store.dispatch({ type: 'some/other/action' });

        expect(setItemSpy).not.toHaveBeenCalled();
        expect(removeItemSpy).not.toHaveBeenCalled();
    });
});

import { vi } from 'vitest';