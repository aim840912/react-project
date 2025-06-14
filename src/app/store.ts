// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
// 1. 匯入 contractApi
import authSlice from "../features/user/authSlice";
import userSlice from "../features/user/userSlice";
import permissionsSlice from "../features/user/permissionSlice";
import { contractApi } from "../features/finance/api/contractApi";
import { authListenerMiddleware } from '../features/user/authMiddleware';

// 如果你還有其他 slice (例如 authSlice、userSlice 等)，也一起 import
// import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
    reducer: {
        authSlice,
        userSlice,
        permissionsSlice,
        // 2. 把 contractApi.reducer 放到 store 裡
        [contractApi.reducerPath]: contractApi.reducer,

        // 3. 如果有其他 slice，也在此登記，例如：
        // auth: authReducer,
    },
    // 4. 把 contractApi.middleware 插入到 middleware 隊列中
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(authListenerMiddleware.middleware)
            .concat(contractApi.middleware),
});

// 以便在 useSelector / useDispatch 時取得正確型別
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
