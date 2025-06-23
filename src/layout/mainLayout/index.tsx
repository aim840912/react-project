import { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import NavLeft from '../../components/navLeft';
import MyBreadCrumb from '../../components/breadCrumb';
import MyHeader from '../../components/header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { addNotification } from '../../features/notifications/notificationSlice';

const { Header, Content, Footer, Sider } = Layout;

function MainLayout() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/dashboard")
        }
    }, [location, navigate])

    useEffect(() => {
        let cleanup: () => void;

        if (import.meta.env.DEV) {
            console.log("⚡️ Using Mock WebSocket for development.");

            const mockSocket = {
                intervalId: null as ReturnType<typeof setInterval> | null,
                onopen: () => { },
                onmessage: (event: { data: string }) => { },
                close: function () {
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                    }
                    console.log("Mock WebSocket closed.");
                }
            };

            setTimeout(() => mockSocket.onopen(), 100);

            mockSocket.onopen = () => {
                console.log("Mock WebSocket connected");
            };

            mockSocket.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    if (message.title && message.description) {
                        dispatch(addNotification({
                            title: message.title,
                            description: message.description
                        }));
                    }
                } catch (error) {
                    console.error("Failed to parse WebSocket message:", error);
                }
            };

            // 每隔 50 秒模擬收到一條消息
            mockSocket.intervalId = setInterval(() => {
                const mockMessages = [
                    { title: "新的報修單", description: `A1棟的電梯需要維修` },
                    { title: "合同即將到期", description: `萬物科技有限公司的租賃合約將於下周到期` },
                    { title: "新的訪客預約", description: `訪客 '王先生' 已預約今日下午3點來訪` }
                ];
                const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
                mockSocket.onmessage({ data: JSON.stringify(randomMessage) });
            }, 50000);

            cleanup = () => mockSocket.close();

        } else {
            const ws = new WebSocket("ws://your-production-ws-url/ws");

            ws.onopen = () => console.log("WebSocket connected");

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    if (message.title && message.description) {
                        dispatch(addNotification({
                            title: message.title,
                            description: message.description
                        }));
                    }
                } catch (error) {
                    console.error("Failed to parse WebSocket message:", error);
                }
            };

            ws.onclose = () => console.log("WebSocket disconnected");
            ws.onerror = (error) => console.error("WebSocket error:", error);

            cleanup = () => ws.close();
        }

        return cleanup;
    }, [dispatch]);

    return <div className='home'>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <NavLeft />
            </Sider>
            <Layout>
                <Header style={{ padding: "0 24px", background: colorBgContainer }}>
                    <MyHeader />
                </Header>
                <Content style={{ margin: '0 16px', height: "90vh", overflowY: "auto", overflowX: "hidden" }}>
                    <MyBreadCrumb />
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    </div>
}

export default MainLayout;
