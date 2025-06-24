import React from 'react';
import { render } from '@testing-library/react';
import { generateRoutes, MenuType } from './generatesRoutes';
import { componentMap } from './routerMap';

vi.mock('./routerMap', () => ({
    componentMap: {
        '/dashboard': () => <div>Dashboard Component</div>,
        '/users/list': () => <div>UserList Component</div>,
        '/settings/permissions': () => <div>Settings Component</div>,
    },
}));

describe('generateRoutes 函式', () => {

    test('應能處理空的菜單陣列，回傳一個空路由陣列', () => {
        const menu: MenuType[] = [];
        const routes = generateRoutes(menu);
        expect(routes).toEqual([]);
    });

    test('應能為沒有子項目的菜單產生扁平的路由結構', () => {
        const menu: MenuType[] = [
            { label: '工作台', icon: 'icon1', key: '/dashboard' },
            { label: '設定', icon: 'icon2', key: '/settings/permissions' },
        ];
        const routes = generateRoutes(menu);

        expect(routes).toHaveLength(2);

        expect(routes[0].path).toBe('/dashboard');
        expect(routes[0].children).toBeUndefined();

        expect(routes[0].element).toBeDefined();

        expect(routes[1].path).toBe('/settings/permissions');
        expect(routes[1].children).toBeUndefined();
        expect(routes[1].element).toBeDefined();
    });

    test('應能為有子項目的菜單產生巢狀的路由結構', () => {
        const menu: MenuType[] = [
            {
                label: '租戶管理',
                icon: 'icon',
                key: '/users',
                children: [
                    { label: '租戶列表', icon: 'icon-child', key: '/users/list' },
                ],
            },
        ];
        const routes = generateRoutes(menu);

        expect(routes).toHaveLength(1);

        const parentRoute = routes[0];
        expect(parentRoute.path).toBe('/users');
        expect(parentRoute.element).toBeDefined();
        expect(parentRoute.children).toBeDefined();
        expect(parentRoute.children).toHaveLength(1);

        const childRoute = parentRoute.children![0];
        expect(childRoute.path).toBe('/users/list');
        expect(childRoute.element).toBeDefined();
    });

    test('應能處理多層級的巢狀路由', () => {
        const menu: MenuType[] = [
            {
                key: '/level1',
                label: 'Level 1',
                icon: 'icon',
                children: [
                    {
                        key: '/level1/level2',
                        label: 'Level 2',
                        icon: 'icon',
                        children: [
                            { key: '/level1/level2/list', label: 'List', icon: 'icon' },
                        ],
                    },
                ],
            },
        ];
        const routes = generateRoutes(menu);

        expect(routes[0].path).toBe('/level1');
        expect(routes[0].children![0].path).toBe('/level1/level2');
        expect(routes[0].children![0].children![0].path).toBe('/level1/level2/list');
    });

    test('如果菜單的 key 在 componentMap 中不存在，應渲染一個提示訊息', () => {
        const menu: MenuType[] = [
            { label: '一個不存在的頁面', icon: 'icon', key: '/non-existent' },
        ];
        const routes = generateRoutes(menu);

        // 渲染這個 element 來檢查內容
        const { getByText } = render(<>{routes[0].element}</>);
        expect(getByText('⚠️ 找不到元件：/non-existent')).toBeInTheDocument();
    });
});

// 因為在頂層使用了 vi.mock，需要手動引入 vi
import { vi } from 'vitest';