import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// 權限狀態的類型定義
export interface PermissionsState {
    userPermissions: string[];
}

// 初始狀態
const initialState: PermissionsState = {
    userPermissions: JSON.parse(sessionStorage.getItem("userPermissions") || "[]"),
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

        // 重置權限
        resetPermissions: (state) => {
            state.userPermissions = [];
        },
    },

});

export const {
    setPermissions,
    addPermission,
    removePermission,
    resetPermissions,
} = permissionsSlice.actions;

// Selectors
const selectPermissionsState = (state: RootState) => state.permissionsSlice;

export const selectUserPermissions = createSelector(
    [selectPermissionsState],
    (permissionsState) => permissionsState.userPermissions
);

// 檢查是否擁有特定權限的 selector，效能更好且可複用
export const selectHasPermission = createSelector(
    [selectUserPermissions, (state: RootState, permission: string) => permission],
    (userPermissions, permission) => userPermissions.includes(permission)
);

export const selectHasAllPermissions = createSelector(
    [
        selectUserPermissions, // <-- 這是我們已經建立的，用於獲取用戶權限列表的 selector
        (state: RootState, requiredPermissions: string[]) => requiredPermissions
    ],
    //下方是執行比較的函式
    (userPermissions, requiredPermissions) => {
        // 如果需要的權限列表是空的，直接回傳 true
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }
        // 使用 .every() 來檢查 userPermissions 是否「每一個」都包含在 requiredPermissions 中
        return requiredPermissions.every(permission => userPermissions.includes(permission));
    }
);

// 導出 reducer
export default permissionsSlice.reducer;