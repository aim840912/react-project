import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface PermissionsState {
    userPermissions: string[];
}

const initialState: PermissionsState = {
    userPermissions: JSON.parse(sessionStorage.getItem("userPermissions") || "[]"),
};

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

const selectPermissionsState = (state: RootState) => state.permissionsSlice;

export const selectUserPermissions = createSelector(
    [selectPermissionsState],
    (permissionsState) => permissionsState.userPermissions
);

export const selectHasPermission = createSelector(
    [selectUserPermissions, (state: RootState, permission: string) => permission],
    (userPermissions, permission) => userPermissions.includes(permission)
);

export const selectHasAllPermissions = createSelector(
    [
        selectUserPermissions,
        (state: RootState, requiredPermissions: string[]) => requiredPermissions
    ],

    (userPermissions, requiredPermissions) => {
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }
        return requiredPermissions.every(permission => userPermissions.includes(permission));
    }
);

export default permissionsSlice.reducer;