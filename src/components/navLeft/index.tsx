import React, { useMemo } from 'react';
import { Menu, MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import logo from "@/assets/logo.png";
import icons from './iconList';
import "./index.scss";

export interface MenuItem {
    key: string,
    label: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
}

export interface MenuItemFromData {
    key: string,
    label: string,
    icon: string,
    children?: MenuItemFromData[]
}

const NavLeft: React.FC = () => {
    const { menuList } = useAppSelector((state) => state.authSlice);
    const navigate = useNavigate();
    const location = useLocation();

    const menuData = useMemo(() => {
        const mapMenuItems = (items: MenuItemFromData[]): MenuItem[] => {
            return items.map((item: MenuItemFromData) => ({
                key: item.key,
                label: item.label,
                icon: item.icon ? icons[item.icon] : null,
                children: item.children ? mapMenuItems(item.children) : undefined
            }));
        };
        return mapMenuItems(menuList || []);
    }, [menuList]);

    // --- 修改處：使用 antd 的 MenuProps['onClick'] 類型 ---
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };

    return (
        <div className='navleft'>
            <div className='logo'>
                <img src={logo} alt="" width={18} />
                <h1>朋遠智慧園區</h1>
            </div>

            <Menu
                // defaultSelectedKeys={['/dashboard']} // 移除，selectedKeys 已經能處理
                mode="inline"
                theme="dark"
                items={menuData}
                onClick={handleMenuClick}
                selectedKeys={[location.pathname]}
                defaultOpenKeys={getDefaultOpenKeys(location.pathname, menuList)}
            />
        </div>
    );
};

function getDefaultOpenKeys(pathname: string, menuItems: MenuItemFromData[]): string[] {
    for (const item of menuItems) {
        if (item.children) {
            if (item.children.some(child => child.key === pathname || pathname.startsWith(child.key + '/'))) {
                return [item.key];
            }

            const deepOpenKey = getDefaultOpenKeys(pathname, item.children);
            if (deepOpenKey.length > 0) {
                return [item.key, ...deepOpenKey];
            }
        }
    }
    return [];
}

export default NavLeft;