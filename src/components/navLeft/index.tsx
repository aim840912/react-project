import React, { useMemo } from 'react';
import { Menu } from 'antd';
import icons from './iconList'
import logo from "../../assets/logo.png"
import { useNavigate, useLocation } from 'react-router-dom';
import "./index.scss"
import { useAppSelector } from '../../store/hooks';
import { MenuItem, MenuItemFromData } from '../../types';

const NavLeft: React.FC = () => {
    const { menuList } = useAppSelector((state) => state.authSlice)
    const navigate = useNavigate()
    const location = useLocation();

    const menuData = useMemo(() => {
        const mapMenuItems = (items: MenuItemFromData[]): MenuItem[] => {
            return items.map((item: MenuItemFromData) => ({
                key: item.key,
                label: item.label,
                icon: item.icon ? icons[item.icon] : null, // 添加圖標存在性檢查
                children: item.children ? mapMenuItems(item.children) : undefined
            }));
        };

        return mapMenuItems(menuList || []);
    }, [menuList]);

    const handleMenuClick = (info: { key: string }) => {
        navigate(info.key);
    };

    return <div className='navleft'>
        <div className='logo'>
            <img src={logo} alt="" width={18} />
            <h1>朋遠智慧園區</h1>
        </div>

        <Menu
            defaultSelectedKeys={['/dashboard']}
            mode="inline"
            theme="dark"
            items={menuData}
            onClick={handleMenuClick}
            selectedKeys={[location.pathname]}
            defaultOpenKeys={getDefaultOpenKeys(location.pathname, menuList)}
        />
    </div>
}

function getDefaultOpenKeys(pathname: string, menuItems: MenuItemFromData[]): string[] {
    const openKeys: string[] = [];

    const findPath = (path: string, items: MenuItemFromData[], parents: string[] = []): boolean => {
        for (const item of items) {
            const currentPath = [...parents];

            if (item.key) {
                currentPath.push(item.key);
            }

            //找到匹配的路徑
            if (item.key === path) {
                openKeys.push(...parents);
                return true;
            }

            //遞歸檢查子菜單
            if (item.children && item.children.length > 0) {
                const found = findPath(path, item.children, currentPath);
                if (found) return true;
            }
        }

        return false;
    };

    findPath(pathname, menuItems);
    return openKeys;
}

export default NavLeft
