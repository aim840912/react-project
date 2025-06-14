import { Card, Table, Button, Row, Col, Input, Tag } from "antd"
import { repairColumns, repairData } from './repair.config'

function Repair() {
    return <div>
        <Card>
            <Row>
                <Col span={8}>
                    <Input placeholder="請輸入維修單號" />
                </Col>
                <Col span={8}>
                    <Button type='primary' className='ml'>查詢</Button>
                </Col>
            </Row>

        </Card>
        <Card className="mt">
            <Table dataSource={repairData} columns={repairColumns} />
        </Card>
    </div>
}

export default Repair
