import { Card, Row, Col, Table, Input, Button } from "antd"
import { estateColumns, estateData } from './tenement.config'

function Tenement() {
    return <div>
        <Card className="search">
            <Row gutter={16}>
                <Col span={4}>
                    <p>樓宇：</p>
                    <Input></Input>
                </Col>
                <Col span={4}>
                    <p>負責人：</p>
                    <Input></Input>
                </Col>
                <Col span={4}>
                    <Button className="mr" type="primary">查詢</Button>
                    <Button>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Table
                columns={estateColumns}
                dataSource={estateData}
            />
        </Card>
    </div>
}

export default Tenement
