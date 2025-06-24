// src/features/logs/logSlice.test.ts

import logReducer, { addLog, clearLogs, LogEntry } from './logSlice';

describe('logSlice 狀態管理', () => {

    test('應處理初始狀態', () => {
        expect(logReducer(undefined, { type: 'unknown' })).toEqual({ entries: [] });
    });

    test('應能處理 addLog，並將新日誌加到陣列最前方', () => {
        const initialState = { entries: [] };

        const firstLogPayload = {
            username: 'admin',
            action: 'USER_LOGIN',
            details: { ip: '127.0.0.1' },
        };
        const firstState = logReducer(initialState, addLog(firstLogPayload));

        // 驗證第一筆日誌
        expect(firstState.entries).toHaveLength(1);
        expect(firstState.entries[0].username).toBe('admin');
        expect(firstState.entries[0].action).toBe('USER_LOGIN');
        // 驗證 id 和 timestamp 是否已自動產生
        expect(firstState.entries[0]).toHaveProperty('id');
        expect(firstState.entries[0]).toHaveProperty('timestamp');

        const secondLogPayload = {
            username: 'tester',
            action: 'UPDATE_PROFILE',
            details: { field: 'email' },
        };
        const secondState = logReducer(firstState, addLog(secondLogPayload));

        // 驗證第二筆日誌被加到最前方
        expect(secondState.entries).toHaveLength(2);
        expect(secondState.entries[0].username).toBe('tester');
        expect(secondState.entries[1].username).toBe('admin');
    });

    test('應能處理 clearLogs，清空所有日誌條目', () => {
        const populatedState = {
            entries: [
                { id: '1', timestamp: new Date().toISOString(), username: 'user1', action: 'LOGIN', details: {} },
                { id: '2', timestamp: new Date().toISOString(), username: 'user2', action: 'LOGOUT', details: {} },
            ] as LogEntry[],
        };

        const nextState = logReducer(populatedState, clearLogs());
        expect(nextState.entries).toEqual([]);
    });
});