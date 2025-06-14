import { Row, Col, Card, Progress, Statistic, Timeline, Tag } from "antd"
import { RadarChartOutlined, SnippetsOutlined, DollarOutlined, LaptopOutlined } from "@ant-design/icons"
import ReactECharts from "echarts-for-react"
import "./index.scss"
import { useEffect, useState } from "react"
import { loadEnergyData } from "../../api/dashboard"
import { EnergyChartSeries, EnergyItem } from '../energy/types';
import type { EChartsOption } from 'echarts';
import { initialOption, option, nightingaleOption } from './dashboard.charts';

function Dashboard() {
    const [chartOption, setChartOption] = useState<EChartsOption>(initialOption)

    useEffect(() => {
        const loadData = async () => {
            const { data: apiData } = await loadEnergyData();
            const dataList: EnergyChartSeries[] = apiData.map((item: EnergyItem) => ({
                name: item.name,
                data: item.data,
                type: "line",
                stack: "Total"
            }));
            const updataOption = {
                ...chartOption,
                legend: {
                    data: dataList.map((item: EnergyChartSeries) => item.name),
                },
                series: dataList
            }
            setChartOption(updataOption)
        }
        loadData()
    }, [])

    return <div className="dashboard">
        <Row gutter={16}>
            <Col span={6}>
                <Card className="clearfix">
                    <div className="fl area">
                        <h2>13479</h2>
                        <p>園區總面積(平方米)</p>
                    </div>
                    <div className="fr">
                        <RadarChartOutlined className="icon" />
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card className="clearfix">
                    <div className="fl area">
                        <h2>8635</h2>
                        <p>總租賃面積(平方米)</p>
                    </div>
                    <div className="fr">
                        <SnippetsOutlined className="icon" style={{ color: "#81c452" }} />
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card className="clearfix">
                    <div className="fl area">
                        <h2>38764</h2>
                        <p>園區總產值(萬元)</p>
                    </div>
                    <div className="fr">
                        <DollarOutlined className="icon" style={{ color: "#62c9cb" }} />
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card className="clearfix">
                    <div className="fl area">
                        <h2>2874</h2>
                        <p>入駐企業總數(家)</p>
                    </div>
                    <div className="fr">
                        <LaptopOutlined className="icon" style={{ color: "#e49362" }} />
                    </div>
                </Card>
            </Col>
        </Row>
        <Row gutter={16} className="mt">
            <Col span={12}>
                <Card title="能源消耗情況">
                    <ReactECharts option={chartOption}></ReactECharts>
                </Card>
            </Col>
            <Col span={12}>
                <Card title="企業資質情況">
                    <ReactECharts option={option}></ReactECharts>
                </Card>
            </Col>
        </Row>
        <Row gutter={16} className="mt">
            <Col span={12}>
                <Card title="租賃情況">
                    <ReactECharts option={nightingaleOption}></ReactECharts>
                </Card>
            </Col>
            <Col span={6}>
                <Card title="充電樁空閒統計">
                    <div className="wrap">
                        <Progress type="circle" percent={75} />
                        <Statistic title="總充電樁數" value={75} suffix="/ 100" className="mt" />
                    </div>

                </Card>
            </Col>
            <Col span={6}>
                <Card title="實時車輛信息" style={{ height: "406px" }}>
                    <Timeline items={[
                        {
                            children: <><Tag color="green">進場</Tag>08:24車輛 京A66666</>
                        },
                        {
                            children: <><Tag color="red">出場</Tag>09:15 車輛 京A66666  </>,
                            color: 'red',
                        },
                        {
                            children: <><Tag color="green">進場</Tag>09:22 車輛 京A23456  </>,
                        },
                        {
                            children: <><Tag color="red">出場</Tag>10:43 車輛 京A18763  </>,
                            color: 'red',
                        },
                        {
                            children: <><Tag color="green">進場</Tag>13:38 車輛 京A88888  </>,
                        },
                        {
                            children: <><Tag color="green">進場</Tag>14:46 車輛 京A23456  </>,

                        },
                    ]} />

                </Card>
            </Col>
        </Row>
    </div>
}

export default Dashboard
