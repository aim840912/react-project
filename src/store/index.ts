// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./login/authSlice";
import userSlice from "./user/userSlice";
import contractSlice from "./finance/contractSlice";

export const store = configureStore({
    reducer: {
        authSlice,
        userSlice,
        contractSlice,
    },
});

// ✅ 加上這兩行
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
