import "./index.scss"
import logo from "../../assets/logo.png"
import bg from "../../assets/bg.jpg"
import lgbg from "../../assets/lgbg.jpg"

import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "../../api/users";
import { setAuth } from "../../store/login/authSlice";
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { setPermissions } from "../../store/permissionSlice";
import { useAppDispatch } from "../../store/hooks";

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const from = (location.state)?.from || "/";

    function handleLogin() {
        form.validateFields().then(async (res) => {
            setLoading(true)
            const { data: { token, username, btnAuth } } = await login(res);
            setLoading(false)
            dispatch(setAuth({ token, username, btnAuth }))
            dispatch(setPermissions(btnAuth))
            navigate(from, { replace: true })
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }

    async function cutomeLogin(account: string, password: string) {
        setLoading(true)
        const { data: { token, username, btnAuth } } = await login({ username: account, password });
        setLoading(false)
        dispatch(setAuth({ token, username, btnAuth }))
        dispatch(setPermissions(btnAuth))
        navigate(from, { replace: true })
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
                <Form form={form}>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your username!' },
                            // { pattern: /^\w{4,8}$/, message: '必須是4~8位數字字母組合' }
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
                            onClick={() => { cutomeLogin("admin", "admin") }} loading={loading}>
                            {t('adminLogin')}
                        </Button>
                        <Button type="primary" className="mb" style={{ width: '100%' }}
                            onClick={() => { cutomeLogin("user", "user") }} loading={loading}>
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
