import { UserOutlined, PoweroffOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, message, Space } from 'antd';
import { clearToken, logout, setMenu } from '../../store/login/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './index.scss'
import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';

enum UserMenuKey {
    PROFILE = 'profile',
    LOGOUT = 'logout',
}

const MyHeader: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = useAppSelector(state => state.authSlice.username) || sessionStorage.getItem("username") || '用戶';
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

    return (
        <div className="my-header">
            <div className="header-right">
                <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
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

export default MyHeader
