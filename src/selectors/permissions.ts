// src/selectors/permissions.ts
import { RootState } from '../store';

// 單純讀取
export const selectUserPermissions = (state: RootState) =>
    state.permissionsSlice.userPermissions;

export const selectIsLoadingPermissions = (state: RootState) =>
    state.permissionsSlice.isLoading;

export const selectPermissionsError = (state: RootState) =>
    state.permissionsSlice.error;

// 帶邏輯判斷的 selector
export const selectHasPermission = (state: RootState, permission: string) =>
    state.permissionsSlice.userPermissions.includes(permission);

export const selectHasAllPermissions = (state: RootState, permissions: string[]) =>
    permissions.every(p =>
        state.permissionsSlice.userPermissions.includes(p)
    );
