import "./index.scss";
import logo from "../../../../assets/logo.png";
import bg from "../../../../assets/bg.jpg";
import lgbg from "../../../../assets/lgbg.jpg";

import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from "../../../../app/hooks";
import { setAuth } from "../../authSlice";
import { setPermissions } from "../../permissionSlice";
import { LoginCredentials } from "../../types";
// 1. 引入我們在 userApi.ts 中建立的 Mutation Hook
import { useLoginMutation } from "../../api/userApi";

function Login() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const from = (location.state as { from?: string })?.from || "/";


    const [login, { isLoading }] = useLoginMutation();

    const performLogin = async (credentials: LoginCredentials) => {
        try {

            const response = await login(credentials).unwrap();

            if (response.data?.token) {
                const { token, username, btnAuth } = response.data;
                dispatch(setAuth({ token, username, btnAuth }));
                dispatch(setPermissions(btnAuth));
                navigate(from, { replace: true });
            } else {
                message.error(response.message || t('loginFailed'));
            }
        } catch (error: any) {
            console.error("登入請求失敗:", error);
            message.error(error.data?.message || "登入時發生錯誤，請稍後再試");
        }
    };

    const handleLogin = () => {
        form.validateFields()
            .then(performLogin)
            .catch(info => {
                console.log('表單驗證失敗:', info);
            });
    };

    return (
        <div className="login" style={{ backgroundImage: `url(${bg})` }}>
            <div className="lgbg" style={{ backgroundImage: `url(${lgbg})` }} >
                <div className="part">
                    <div className="title">
                        <div className="logo">
                            <img src={logo} width={100} alt="" />
                        </div>
                        <h1>朋遠</h1>
                    </div>
                    <Form form={form} onFinish={performLogin} >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="請輸入您的用戶名" prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="請輸入您的密碼" prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" className="mb" style={{ width: '100%' }} htmlType="submit" loading={isLoading}>
                                {t('login')}
                            </Button>
                            <Button type="primary" className="mb" style={{ width: '100%' }}
                                onClick={() => performLogin({ username: "admin", password: "admin" })} loading={isLoading}>
                                {t('adminLogin')}
                            </Button>
                            <Button type="primary" className="mb" style={{ width: '100%' }}
                                onClick={() => performLogin({ username: "manager", password: "manager" })} loading={isLoading}>
                                {t('managerLogin')}
                            </Button>
                            <Button type="primary" className="mb" style={{ width: '100%' }}
                                onClick={() => performLogin({ username: "user", password: "user" })} loading={isLoading}>
                                {t('userLogin')}
                            </Button>
                            <div>
                                <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
                                <Button onClick={() => i18n.changeLanguage('zh')}>中文</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;