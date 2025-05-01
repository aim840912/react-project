import React, { useCallback, useEffect, useState } from 'react';
import { Menu } from 'antd';
import icons from './iconList'
import logo from "../../assets/logo.png"
import { useNavigate, useLocation } from 'react-router-dom';

import "./index.scss"
import { useAppSelector } from '../../store/hooks';
interface MenuItem {
    key: string,
    label: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
}
interface MenuItemFromData {
    key: string,
    label: string,
    icon: string,
    children?: MenuItemFromData[]
}

function NavLeft() {
    const { menuList } = useAppSelector((state) => state.authSlice)
    const navigate = useNavigate()
    const [menuData, setMenuData] = useState<MenuItem[]>([])
    const location = useLocation();

    // 將返回的菜單數據轉換成我們需要的格式
    const mapMenuItems = useCallback((items: MenuItemFromData[]): MenuItem[] => {
        return items.map((item: MenuItemFromData) => ({
            key: item.key,
            label: item.label,
            icon: icons[item.icon],
            children: item.children ? mapMenuItems(item.children) : undefined
        }));
    }, []);

    const configMenu = useCallback(() => {
        const mappedMenuItems: MenuItem[] = mapMenuItems(menuList)
        setMenuData(mappedMenuItems)
    }, [menuList, mapMenuItems])

    useEffect(() => {
        configMenu()
    }, [configMenu])

    function handleClick({ key }: { key: string }) {
        navigate(key)
    }


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
            onClick={handleClick}
            selectedKeys={[location.pathname]}
        />
    </div>
}

export default NavLeft
