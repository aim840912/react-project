import { useAppSelector } from '../../app/hooks';
import {
    selectHasAllPermissions,
    selectHasPermission
} from './permissionSlice';

export function usePermissions() {
    const hasAll = (requiredPermissions: string[]): boolean =>
        useAppSelector(state => selectHasAllPermissions(state, requiredPermissions));

    const has = (requiredPermission: string): boolean =>
        useAppSelector(state => selectHasPermission(state, requiredPermission));

    return { has, hasAll };
}