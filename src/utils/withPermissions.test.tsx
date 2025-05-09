// withPermissions.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import withPermissions from './withPermissions';

// 把 useAppSelector & selectHasAllPermissions 都 mock 掉
jest.mock('../store/hooks', () => ({
    useAppSelector: jest.fn(),
}));
jest.mock('../store/permissionSlice', () => ({
    selectHasAllPermissions: jest.fn(),
}));

import { useAppSelector } from '../store/hooks';
import { selectHasAllPermissions } from '../selectors/permissions';

describe('withPermissions HOC', () => {
    // Dummy component 接收 message
    const Dummy: React.FC<{ message: string }> = ({ message }) => (
        <span data-testid="dummy">{message}</span>
    );

    // 這裡透過泛型指定 WrappedDummy 的 props 型別
    const WrappedDummy =
        withPermissions<{ message: string }>(['A', 'B'])(Dummy);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('權限通過 (selectHasAllPermissions = true) 時，渲染原始元件', () => {
        (selectHasAllPermissions as jest.Mock).mockReturnValue(true);
        (useAppSelector as jest.Mock).mockImplementation(fn => fn({}));

        render(<WrappedDummy message="Hello TS" />);
        expect(screen.getByTestId('dummy')).toHaveTextContent('Hello TS');
    });

    it('權限不夠 (selectHasAllPermissions = false) 時，顯示無訪問權限', () => {
        (selectHasAllPermissions as jest.Mock).mockReturnValue(false);
        (useAppSelector as jest.Mock).mockImplementation(fn => fn({}));

        render(<WrappedDummy message="Hello TS" />);
        expect(screen.getByText('無訪問權限')).toBeInTheDocument();
        expect(screen.queryByTestId('dummy')).toBeNull();
    });
});
