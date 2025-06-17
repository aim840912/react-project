import { Card, Row, Col, Table, Input, Button, Tabs } from "antd"
import type { TabsProps } from 'antd';
import { chargeRecordColumns, inParkCarColumns, chargeRecordData, inParkCarData } from './car.config';

const items: TabsProps['items'] = [
    {
        key: "1",
        label: "充電記錄",
        children: <Table columns={chargeRecordColumns} dataSource={chargeRecordData} />
    },
    {
        key: "2",
        label: "園內車輛列表",
        children: <Table columns={inParkCarColumns} dataSource={inParkCarData} />
    }
]

function Car() {
    return <div>
        <Card>
            <Row gutter={16}>
                <Col span={8}>
                    <Input placeholder="請輸入車牌號、手機號或者聯繫人" />
                </Col>
                <Col span={8}>
                    <Button type="primary" className="ml">查詢</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Tabs items={items}></Tabs>
        </Card>
    </div>
}

export default Car