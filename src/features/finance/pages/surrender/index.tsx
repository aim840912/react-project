import { Card, Button, Descriptions } from "antd"
import { useNavigate, useSearchParams } from "react-router"
import { items, items2 } from "./surrender.config"

function Surrender() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    return <div>
        <Card>
            <Button type="primary" onClick={() => navigate("/finance/contract?return=true")}>返回</Button>
        </Card>
        <Card className="mt">
            <Descriptions title={`合同編號：${searchParams.get("contractNo")}`} bordered items={items} />
            <Descriptions title="租賃房間信息" bordered items={items2} className="mt" />
        </Card>
    </div>
}

export default Surrender