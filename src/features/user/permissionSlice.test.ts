import permissionsReducer, {
    setPermissions,
    addPermission,
    removePermission,
    resetPermissions,
    PermissionsState,
} from './permissionSlice';

describe('permissionSlice 狀態管理', () => {

    const initialState: PermissionsState = {
        userPermissions: [],
    };

    const populatedState: PermissionsState = {
        userPermissions: ['user:read', 'post:create'],
    };

    test('應回傳初始狀態', () => {
        expect(permissionsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('應能使用 setPermissions 正確設定權限', () => {
        const newPermissions = ['admin', 'dashboard:view'];
        const nextState = permissionsReducer(initialState, setPermissions(newPermissions));
        expect(nextState.userPermissions).toEqual(newPermissions);
    });

    test('應能使用 addPermission 新增一個權限', () => {
        const nextState = permissionsReducer(populatedState, addPermission('post:delete'));
        expect(nextState.userPermissions).toHaveLength(3);
        expect(nextState.userPermissions).toContain('post:delete');
    });

    test('使用 addPermission 新增已存在的權限時，不應重複加入', () => {
        const nextState = permissionsReducer(populatedState, addPermission('user:read'));
        expect(nextState.userPermissions).toHaveLength(2);
        expect(nextState.userPermissions).toEqual(populatedState.userPermissions);
    });

    test('應能使用 removePermission 移除一個存在的權限', () => {
        const nextState = permissionsReducer(populatedState, removePermission('post:create'));
        expect(nextState.userPermissions).toHaveLength(1);
        expect(nextState.userPermissions).not.toContain('post:create');
        expect(nextState.userPermissions).toContain('user:read');
    });

    test('使用 removePermission 移除一個不存在的權限時，狀態不應改變', () => {
        const nextState = permissionsReducer(populatedState, removePermission('non-existent:permission'));
        expect(nextState.userPermissions).toEqual(populatedState.userPermissions);
    });

    test('應能使用 resetPermissions 清空所有權限', () => {
        const nextState = permissionsReducer(populatedState, resetPermissions());
        expect(nextState.userPermissions).toEqual([]);
    });
});