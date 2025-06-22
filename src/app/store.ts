import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/user/authSlice";
import permissionsSlice from "../features/user/permissionSlice";
import { financeApi } from "../features/finance/api/financeApi";
import { authListenerMiddleware } from '../features/user/authMiddleware';
import { equipmentApi } from "../features/equipment/api/equipmentApi";
import { settingsApi } from "../features/settings/api/settingsApi";
import { estateApi } from "../features/estate/api/estateApi";
import { dashboardApi } from "../features/dashboard/api/dashboardApi";
import { userApi } from "../features/user/api/userApi";

export const store = configureStore({
    reducer: {
        authSlice,
        permissionsSlice,
        [financeApi.reducerPath]: financeApi.reducer,
        [equipmentApi.reducerPath]: equipmentApi.reducer,
        [settingsApi.reducerPath]: settingsApi.reducer,
        [estateApi.reducerPath]: estateApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(authListenerMiddleware.middleware)
            .concat(financeApi.middleware)
            .concat(equipmentApi.middleware)
            .concat(settingsApi.middleware)
            .concat(estateApi.middleware)
            .concat(dashboardApi.middleware)
            .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
