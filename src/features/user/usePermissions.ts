// 檔案：src/features/user/usePermissions.ts (新增檔案)

import { useAppSelector } from '../../app/hooks';
import {
    selectHasAllPermissions,
    selectHasPermission
} from './permissionSlice';

/**
 * @description 一個提供權限檢查邏輯的自訂 Hook。
 * @returns 包含 has() 和 hasAll() 兩個方法的物件。
 */
export function usePermissions() {
    /**
     * 檢查是否擁有所有必要的權限。
     * @param requiredPermissions - 一個包含必要權限字串的陣列。
     * @returns 如果使用者擁有所有權限，則為 true，否則為 false。
     */
    const hasAll = (requiredPermissions: string[]): boolean =>
        useAppSelector(state => selectHasAllPermissions(state, requiredPermissions));

    /**
     * 檢查是否擁有單一權限。
     * @param requiredPermission - 一個權限字串。
     * @returns 如果使用者擁有該權限，則為 true，否則為 false。
     */
    const has = (requiredPermission: string): boolean =>
        useAppSelector(state => selectHasPermission(state, requiredPermission));

    // 您也可以在這裡擴充更多方法，例如 hasAny (擁有任一權限)

    return { has, hasAll };
}