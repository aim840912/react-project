import {
    UserOutlined,
    PoweroffOutlined,
    DownOutlined,
    SunOutlined,
    MoonOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, message, Space, Switch } from 'antd';
import { logout, setMenu } from '../../features/user/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import './index.scss'
import { memo, useMemo } from 'react';
import GlobalSearch from '../GlobalSearch';
import { toggleTheme } from '../../features/theme/themeSlice';

enum UserMenuKey {
    PROFILE = 'profile',
    LOGOUT = 'logout',
}

const MyHeader: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const username = useAppSelector(state => state.authSlice.username) || sessionStorage.getItem("username") || '用戶';
    const currentTheme = useAppSelector(state => state.theme.theme);

    const menuItems: MenuProps['items'] = useMemo(() => [
        {
            key: UserMenuKey.PROFILE,
            label: <span>個人中心</span>,
            icon: <UserOutlined />,
        },
        {
            key: UserMenuKey.LOGOUT,
            label: <span>退出登錄</span>,
            icon: <PoweroffOutlined />,
            danger: true,
        },
    ], []);

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case UserMenuKey.PROFILE:
                navigate("/personal");
                break;
            case UserMenuKey.LOGOUT:
                dispatch(logout());
                dispatch(setMenu([]));
                message.success('成功退出登錄');
                navigate("/login", { replace: true });
                break;
            default:
                break;
        }
    };

    const onThemeChange = () => {
        dispatch(toggleTheme());
    };

    return (
        <div className="my-header">
            {/* 將 GlobalSearch 和右側內容分開 */}
            <div className="header-left">
                <GlobalSearch />
            </div>
            <div className="header-right">
                <Switch
                    checkedChildren={<SunOutlined />}
                    unCheckedChildren={<MoonOutlined />}
                    checked={currentTheme === 'light'}
                    onChange={onThemeChange}
                />
                <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }} placement="bottomRight">
                    <span role="button" className="dropdown-trigger">
                        <Space>
                            <Avatar size="small" icon={<UserOutlined />} />
                            歡迎您, {username}
                            <DownOutlined />
                        </Space>
                    </span>
                </Dropdown>
            </div>
        </div>
    );
};

export default memo(MyHeader);