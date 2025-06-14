import "./style.scss"
import ReactECharts from "echarts-for-react"
import { Card, Col, Row, Table } from 'antd';
import { EnterpriseEnergyData } from "./types";
import { dailyEnergyOption, overviewOption, pieChartOption } from "./energy.charts";
import { energyColumns, energyData } from './energy.config'

function Energy() {
    return <div className="dashboard">
        <Row gutter={16} className="mt">
            <Col span={12}>
                <Card title="能源消耗情況" >
                    <ReactECharts option={dailyEnergyOption} />
                </Card>
            </Col>
            <Col span={12}>
                <Card title="消耗總覽" >
                    <ReactECharts option={overviewOption} />
                </Card>
            </Col>
        </Row>
        <Row gutter={16} className="mt" >
            <Col span={12} >
                <Card title="能源消耗佔比" style={{ height: "400px" }}>
                    <ReactECharts option={pieChartOption} />
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <Table<EnterpriseEnergyData> columns={energyColumns} dataSource={energyData} pagination={false} />
                </Card>

            </Col>
        </Row>
    </div>
}
export default Energy