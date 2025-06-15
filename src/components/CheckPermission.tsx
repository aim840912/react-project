// 檔案：src/components/CheckPermission.tsx (新增檔案)

import React from 'react';
import { usePermissions } from '../features/user/usePermissions';

interface CheckPermissionProps {
    /**
     * 渲染子內容所需要的所有權限。
     */
    required: string[];
    /**
     * 當權限檢查通過時要渲染的內容。
     */
    children: React.ReactNode;
    /**
     * 當權限檢查失敗時要渲染的內容 (可選，預設為不渲染任何東西)。
     */
    fallback?: React.ReactNode;
}

/**
 * @description 一個聲明式的權限檢查元件，
 * 用於根據使用者權限決定是否渲染其子內容。
 */
export function CheckPermission({ required, children, fallback = null }: CheckPermissionProps) {
    // 內部使用我們剛剛建立的 Hook
    const { hasAll } = usePermissions();
    const canAccess = hasAll(required);

    return <>{canAccess ? children : fallback}</>;
}