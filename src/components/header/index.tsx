import { UserOutlined, PoweroffOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { clearToken } from '../../store/login/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMenu } from '../../store/login/authSlice';
import './index.scss'

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <span>個人中心</span>
        ),
        icon: <UserOutlined />,
    },
    {
        key: '2',
        label: (
            <span>退出登錄</span>
        ),
        icon: <PoweroffOutlined />,
    },

];
function MyHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === "1") {
            //跳轉到個人中心
            navigate("/personal")
        } else {
            dispatch(clearToken());
            dispatch(setMenu([]))
            sessionStorage.clear()
        }

    }
    return <div>
        <Dropdown menu={{ items, onClick }}>
            <span role="button" className="dropdown-trigger">
                <Space>
                    歡迎您,{sessionStorage.getItem("username")}
                    <DownOutlined />
                </Space>
            </span>

        </Dropdown>
    </div>
}

export default MyHeader
