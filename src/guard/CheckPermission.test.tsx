import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { CheckPermission } from './CheckPermission';

const mockPermissionsSlice = createSlice({
    name: 'permissionsSlice',
    initialState: { userPermissions: [] as string[] },
    reducers: {
        setTestPermissions: (state, action) => {
            state.userPermissions = action.payload;
        },
    },
});

const { setTestPermissions } = mockPermissionsSlice.actions;

const createTestStore = (permissions: string[]) => {
    const store = configureStore({
        reducer: {
            permissionsSlice: mockPermissionsSlice.reducer,
        },
    });
    store.dispatch(setTestPermissions(permissions));
    return store;
};

const renderWithPermissions = (
    ui: React.ReactElement,
    permissions: string[]
) => {
    const store = createTestStore(permissions);
    return render(<Provider store={store}>{ui}</Provider>);
};

describe('CheckPermission 元件', () => {

    test('當使用者擁有所有必要權限時，應渲染子元件', () => {
        const userPermissions = ['user:read', 'post:create'];
        const requiredPermissions = ['user:read', 'post:create'];

        renderWithPermissions(
            <CheckPermission required={requiredPermissions}>
                <div>受保護的內容</div>
            </CheckPermission>,
            userPermissions
        );

        expect(screen.getByText('受保護的內容')).toBeInTheDocument();
    });

    test('當使用者只擁有部分必要權限時，不應渲染子元件', () => {
        const userPermissions = ['user:read'];
        const requiredPermissions = ['user:read', 'post:create'];

        renderWithPermissions(
            <CheckPermission required={requiredPermissions}>
                <div>受保護的內容</div>
            </CheckPermission>,
            userPermissions
        );

        expect(screen.queryByText('受保護的內容')).not.toBeInTheDocument();
    });

    test('當使用者缺少所有必要權限時，不應渲染子元件', () => {
        const userPermissions = ['guest:view'];
        const requiredPermissions = ['user:read', 'post:create'];

        renderWithPermissions(
            <CheckPermission required={requiredPermissions}>
                <div>受保護的內容</div>
            </CheckPermission>,
            userPermissions
        );

        expect(screen.queryByText('受保護的內容')).not.toBeInTheDocument();
    });

    test('當缺少權限時，應渲染提供的 fallback 內容', () => {
        const userPermissions: string[] = [];
        const requiredPermissions = ['user:read'];

        renderWithPermissions(
            <CheckPermission required={requiredPermissions} fallback={<div>無權限</div>}>
                <div>受保護的內容</div>
            </CheckPermission>,
            userPermissions
        );

        expect(screen.queryByText('受保護的內容')).not.toBeInTheDocument();
        expect(screen.getByText('無權限')).toBeInTheDocument();
    });

    test('當 required 陣列為空時，應始終渲染子元件', () => {
        const userPermissions = ['user:read'];

        renderWithPermissions(
            <CheckPermission required={[]}>
                <div>公開內容</div>
            </CheckPermission>,
            userPermissions
        );

        expect(screen.getByText('公開內容')).toBeInTheDocument();
    });
});