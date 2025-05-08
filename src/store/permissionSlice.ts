import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

// 權限狀態的類型定義
interface PermissionsState {
    userPermissions: string[];
    isLoading: boolean;
    error: string | null;
}

// 初始狀態
const initialState: PermissionsState = {
    userPermissions: [],
    isLoading: false,
    error: null,
};

// 創建 slice
export const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        // 設置用戶權限
        setPermissions: (state, action: PayloadAction<string[]>) => {
            state.userPermissions = action.payload;
        },

        // 添加權限
        addPermission: (state, action: PayloadAction<string>) => {
            if (!state.userPermissions.includes(action.payload)) {
                state.userPermissions.push(action.payload);
            }
        },

        // 移除權限
        removePermission: (state, action: PayloadAction<string>) => {
            state.userPermissions = state.userPermissions.filter(
                permission => permission !== action.payload
            );
        },

        // 設置加載狀態
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        // 設置錯誤
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        // 重置權限
        resetPermissions: (state) => {
            state.userPermissions = [];
        },
    },
});

// 導出 actions
export const {
    setPermissions,
    addPermission,
    removePermission,
    setLoading,
    setError,
    resetPermissions,
} = permissionsSlice.actions;

// 導出 reducer
export default permissionsSlice.reducer;

// 為了類型安全，定義 RootState 類型
// 實際使用時，您應該從 store 中導入 RootState 類型
// import { RootState } from '../store';


// 選擇器 (selectors)
export const selectUserPermissions = (state: RootState) => state.permissionsSlice.userPermissions;
export const selectIsLoadingPermissions = (state: RootState) => state.permissionsSlice.isLoading;
export const selectPermissionsError = (state: RootState) => state.permissionsSlice.error;
// 檢查是否擁有特定權限的選擇器
export const selectHasPermission = (state: RootState, permission: string) => state.permissionsSlice.userPermissions.includes(permission);
// 檢查是否擁有所有指定權限的選擇器
export const selectHasAllPermissions = (state: RootState, permissions: string[]) => permissions.every(permission => state.permissionsSlice.userPermissions.includes(permission));