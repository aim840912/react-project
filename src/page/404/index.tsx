import { Button, Empty, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return <div style={{ marginTop: "100px" }}> <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        styles={{ image: { height: 60 } }}
        description={
            <Typography.Text>
                溫馨提示 <a href="#API">頁面丟失</a>
            </Typography.Text>
        }
    >
        <Button type="primary" onClick={() => navigate("/")}>回到首頁</Button>
    </Empty>

    </div>
}

export default NotFound
