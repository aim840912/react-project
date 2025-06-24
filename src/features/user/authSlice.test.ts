// src/features/user/authSlice.test.ts

import authReducer, { setAuth, logout, setMenu, AuthState } from './authSlice';

describe('authSlice 狀態管理', () => {

    const initialState: AuthState = {
        token: null,
        username: null,
        btnAuth: [],
        menuList: [],
    };

    test('應能處理初始狀態', () => {
        expect(authReducer(undefined, { type: 'unknown' })).toEqual({
            token: null,
            username: null,
            btnAuth: [],
            menuList: [],
        });
    });

    test('應能正確處理 setAuth', () => {
        const payload = {
            token: 'mock-token-123',
            username: 'tester',
            btnAuth: ['add', 'edit'],
        };
        const nextState = authReducer(initialState, setAuth(payload));

        expect(nextState.token).toBe(payload.token);
        expect(nextState.username).toBe(payload.username);
        expect(nextState.btnAuth).toEqual(payload.btnAuth);
    });

    test('應能正確處理 logout', () => {
        const loggedInState: AuthState = {
            token: 'mock-token-123',
            username: 'tester',
            btnAuth: ['add', 'edit'],
            menuList: [{ key: '/dashboard', label: '工作台', icon: 'DashboardOutlined' }] as any,
        };

        const nextState = authReducer(loggedInState, logout());

        expect(nextState.token).toBeNull();
        expect(nextState.username).toBeNull();
        expect(nextState.btnAuth).toEqual([]);
        expect(nextState.menuList).toEqual([]);
    });

    test('應能正確處理 setMenu', () => {
        const menuPayload = [
            { key: '/dashboard', label: '工作台', icon: 'DashboardOutlined' },
            { key: '/users', label: '租戶管理', icon: 'TeamOutlined' },
        ];
        const nextState = authReducer(initialState, setMenu(menuPayload));

        expect(nextState.menuList).toEqual(menuPayload);
    });
});