import "./index.scss"
import logo from "../../../../assets/logo.png"
import bg from "../../../../assets/bg.jpg"
import lgbg from "../../../../assets/lgbg.jpg"

import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "../../../../api/users";
import { setAuth } from "../../authSlice";
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { setPermissions } from "../../permissionSlice";
import { useAppDispatch } from "../../../../app/hooks";
import { LoginCredentials, LoginResponse } from "../../types";

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const from = (location.state)?.from || "/";

    async function performLogin(credentials: LoginCredentials) {
        setLoading(true);
        try {
            const response = await login(credentials);

            if (response.data?.token) {
                const { token, username, btnAuth } = response.data;
                dispatch(setAuth({ token, username, btnAuth }));
                dispatch(setPermissions(btnAuth));
                navigate(from, { replace: true });
            } else {
                message.error(response.message || t('loginFailed'));

            }
        } catch (error) {
            console.error("Login API call failed:", error);
        } finally {
            setLoading(false);
        }
    }

    function handleLogin() {
        form.validateFields()
            .then(performLogin)
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    return <div className="login" style={{ backgroundImage: `url(${bg})` }}>
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
                        rules={[
                            { required: true, message: 'Please input your username!' },
                        ]}
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
                        <Button type="primary" className="mb" style={{ width: '100%' }}
                            onClick={handleLogin} loading={loading}>
                            {t('login')}
                        </Button>
                        <Button type="primary" className="mb" style={{ width: '100%' }}
                            onClick={() => performLogin({ username: "admin", password: "admin" })} loading={loading}>
                            {t('adminLogin')}
                        </Button>
                        <Button type="primary" className="mb" style={{ width: '100%' }}
                            onClick={() => performLogin({ username: "manager", password: "manager" })} loading={loading}>
                            {t('managerLogin')}
                        </Button>
                        <Button type="primary" className="mb" style={{ width: '100%' }}
                            onClick={() => performLogin({ username: "user", password: "user" })} loading={loading}>
                            {t('userLogin')}
                        </Button>
                        <div >
                            <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
                            <Button onClick={() => i18n.changeLanguage('zh')}>中文</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
}

export default Login;
