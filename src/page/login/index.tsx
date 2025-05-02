import "./index.scss"
import logo from "../../assets/logo.png"
import bg from "../../assets/bg.jpg"
import lgbg from "../../assets/lgbg.jpg"

import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "../../api/users";
import { setToken } from "../../store/login/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import type { LoginRequest, LoginResponse, ApiResponse } from "../../types/api";


function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogin() {
        form.validateFields().then(async (res: LoginRequest) => {
            setLoading(true);
            try {
                const response: ApiResponse<LoginResponse> = await login(res);

                if (!response.data) {
                    throw new Error("登入失敗，無法取得資料");
                }

                const { token, username, btnAuth } = response.data;

                dispatch(setToken(token));
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("btnAuth", JSON.stringify(btnAuth));
                navigate("/dashboard", { replace: true });
            } catch (err) {
                console.error("登入失敗:", err);
            } finally {
                setLoading(false);
            }
        }).catch((err) => {
            setLoading(false);
            console.log("驗證失敗:", err);
        });
    }

    async function cutomeLogin(account: string, password: string) {
        setLoading(true)

        const response: ApiResponse<LoginResponse> = await login({ username: account, password });
        if (!response.data) {
            throw new Error("登入失敗，無法取得資料");
        }
        const { token, username, btnAuth } = response.data;
        setLoading(false)
        dispatch(setToken(token))
        sessionStorage.setItem("username", username)
        sessionStorage.setItem("btnAuth", JSON.stringify(btnAuth))
        navigate("/dashboard", { replace: true })
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
                            登入
                        </Button>
                        <Button type="primary" className="mb" style={{ width: '100%' }}
                            onClick={() => { cutomeLogin("admin", "admin") }} loading={loading}>
                            管理員登入
                        </Button>
                        <Button type="primary" className="mb" style={{ width: '100%' }}
                            onClick={() => { cutomeLogin("user", "user") }} loading={loading}>
                            普通使用者登入
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
}

export default Login;
