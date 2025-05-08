import { useSelector } from 'react-redux';
import {
    selectUserPermissions,
    selectHasPermission,
    selectHasAllPermissions,
} from '../store/permissionSlice';
import { RootState } from '../store';

/**
 * 權限管理 Hook - 提供權限相關的輔助功能
 *
 * @returns 返回權限相關的工具函數
 */
export const usePermissions = () => {
    const userPermissions = useSelector(selectUserPermissions);

    /**
     * 檢查用戶是否擁有特定權限
     *
     * @param permission - 需要檢查的權限
     * @returns 若用戶擁有該權限則返回true，否則返回false
     */
    const hasPermission = (permission: string): boolean => {
        return useSelector((state: RootState) => selectHasPermission(state, permission));
    };

    /**
     * 檢查用戶是否擁有所有指定的權限
     *
     * @param permissions - 需要檢查的權限列表
     * @returns 若用戶擁有所有列出的權限則返回true，否則返回false
     */
    const hasAllPermissions = (permissions: string[]): boolean => {
        return useSelector((state: RootState) => selectHasAllPermissions(state, permissions));
    };

    /**
     * 檢查用戶是否擁有至少一個指定的權限
     *
     * @param permissions - 需要檢查的權限列表
     * @returns 若用戶擁有至少一個列出的權限則返回true，否則返回false
     */
    const hasAnyPermission = (permissions: string[]): boolean => {
        return permissions.some(permission => hasPermission(permission));
    };

    return {
        userPermissions,
        hasPermission,
        hasAllPermissions,
        hasAnyPermission
    };
};

export default usePermissions;