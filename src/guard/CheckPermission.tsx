import React from 'react';
import { usePermissions } from '../features/user/usePermissions';

interface CheckPermissionProps {

    required: string[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function CheckPermission({ required, children, fallback = null }: CheckPermissionProps) {
    const { hasAll } = usePermissions();
    const canAccess = hasAll(required);

    return <>{canAccess ? children : fallback}</>;
}