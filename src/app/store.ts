import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/user/authSlice";
import userSlice from "../features/user/userSlice";
import permissionsSlice from "../features/user/permissionSlice";
import { contractApi } from "../features/finance/api/contractApi";
import { authListenerMiddleware } from '../features/user/authMiddleware';

export const store = configureStore({
    reducer: {
        authSlice,
        // userSlice,
        permissionsSlice,
        [contractApi.reducerPath]: contractApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(authListenerMiddleware.middleware)
            .concat(contractApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
