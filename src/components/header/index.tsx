import {
    UserOutlined,
    PoweroffOutlined,
    DownOutlined,
    SunOutlined,
    MoonOutlined,
    BellOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, message, Space, Switch, Badge, List, Button } from 'antd';
import { logout, setMenu } from '../../features/user/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import './index.scss'
import { memo, useMemo } from 'react';
import GlobalSearch from '../GlobalSearch';
import { toggleTheme } from '../../features/theme/themeSlice';
import { selectNotifications, selectUnreadCount, markAllAsRead, clearNotifications } from '../../features/notifications/notificationSlice';

enum UserMenuKey {
    PROFILE = 'profile',
    LOGOUT = 'logout',
}

const MyHeader: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const username = useAppSelector(state => state.authSlice.username) || sessionStorage.getItem("username") || '用戶';
    const currentTheme = useAppSelector(state => state.theme.theme);
    const notifications = useAppSelector(selectNotifications);
    const unreadCount = useAppSelector(selectUnreadCount);

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

    const notificationOverlay = (
        <div style={{
            width: 320,
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontWeight: 'bold' }}>通知</span>
                {unreadCount > 0 && <Button type="link" size="small" onClick={() => dispatch(markAllAsRead())}>全部標為已讀</Button>}
            </div>
            <List
                style={{ flex: 1, overflowY: 'auto', maxHeight: 400 }}
                dataSource={notifications}
                locale={{ emptyText: "暫無新通知" }}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        style={{ padding: '8px 16px', borderBottom: '1px solid #f0f0f0', opacity: item.read ? 0.6 : 1 }}
                        onClick={() => navigate('/notifications/detail/' + item.id)}
                    >
                        <List.Item.Meta
                            title={<span style={{ fontWeight: item.read ? 'normal' : 'bold' }}>{item.title}</span>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
            <div style={{ textAlign: 'center', padding: '8px 0', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-around' }}>
                <Button type="link" disabled={notifications.length === 0} onClick={() => dispatch(clearNotifications())}>
                    清除通知
                </Button>
                <Button type="link" >
                    查看全部
                </Button>
            </div>
        </div>
    );

    return (
        <div className="my-header">
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
                <Dropdown popupRender={() => notificationOverlay} trigger={['click']}>
                    <Badge count={unreadCount} size="small" style={{ marginRight: '24px' }}>
                        <BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
                    </Badge>
                </Dropdown>
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