import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { userApi } from '@/features/user/api/userApi';
import { addLog } from './logSlice';
import { RootState } from "@/app/store";

export const logListenerMiddleware = createListenerMiddleware();

const actionsToLog = isAnyOf(
    userApi.endpoints.login.matchFulfilled,
    userApi.endpoints.updateUser.matchFulfilled,
    userApi.endpoints.deleteUser.matchFulfilled,
    userApi.endpoints.batchDeleteUser.matchFulfilled
);

logListenerMiddleware.startListening({
    matcher: actionsToLog,
    effect: (action, listenerApi) => {
        const state = listenerApi.getState() as RootState;
        const username = state.authSlice.username || '未知用戶';
        let logActionText = '未知操作';
        let details: Record<string, any> = {};

        if (userApi.endpoints.login.matchFulfilled(action)) {
            logActionText = `使用者登入`;
            details = { username: action.payload.data.username };
        } else if (userApi.endpoints.updateUser.matchFulfilled(action)) {
            logActionText = `更新使用者資料`;
            details = { userId: action.meta.arg.originalArgs.id };
        } else if (userApi.endpoints.deleteUser.matchFulfilled(action)) {
            logActionText = `刪除使用者`;
            details = { userId: action.meta.arg.originalArgs };
        } else if (userApi.endpoints.batchDeleteUser.matchFulfilled(action)) {
            logActionText = `批次刪除使用者`;
            details = { userIds: action.meta.arg.originalArgs };
        }

        listenerApi.dispatch(addLog({
            username,
            action: logActionText,
            details,
        }));
    }
});