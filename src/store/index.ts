// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./login/authSlice";
import userSlice from "./user/userSlice";
import contractSlice from "./finance/contractSlice";
import permissionsSlice from "./permissionSlice";
// 1. 匯入 contractApi
import { contractApi } from "../api/contractApi";

export const store = configureStore({
    reducer: {
        authSlice,
        userSlice,
        contractSlice,
        permissionsSlice,
        [contractApi.reducerPath]: contractApi.reducer,
    },
    // 4. 把 contractApi.middleware 插入到 middleware 隊列中
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contractApi.middleware),
});


// ✅ 加上這兩行
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
