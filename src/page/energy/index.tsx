import "./style.scss"
import ReactECharts from "echarts-for-react"
import { Card, Col, Row, Table } from 'antd';
import type { ColumnsType } from "antd/es/table";
import { EnterpriseEnergyData } from "../../types/energy";
import type { EChartsOption } from 'echarts';

const columns: ColumnsType<EnterpriseEnergyData> = [
    {
        title: "No.",
        key: "index",
        render: (_text, _record, index) => index + 1,
    },
    {
        title: "企業名稱",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "企業樓宇",
        dataIndex: "building",
        key: "building",
    },
    {
        title: "電力消耗",
        dataIndex: "elec",
        key: "elec",
    },
    {
        title: "熱力消耗",
        dataIndex: "hot",
        key: "hot",
    },
    {
        title: "碳排放",
        dataIndex: "c",
        key: "c",
    }
]

const data: EnterpriseEnergyData[] = [
    {
        name: "北京唧唧科技有限公司",
        building: "B2幢樓-801室",
        elec: 70,
        hot: 45,
        c: 22
    },
    {
        name: "上海一二三網絡有限公司",
        building: "A2幢樓-902室",
        elec: 70,
        hot: 37,
        c: 21
    },
    {
        name: "有條數據信息有限公司",
        building: "時代金融廣場-803室",
        elec: 60,
        hot: 25,
        c: 17
    },
    {
        name: "筋斗云網絡有限公司",
        building: "天匯國際大廈A座-1902室",
        elec: 33,
        hot: 21,
        c: 6
    },
    {
        name: "北京盎司科技有限公司",
        building: "A2幢樓-401室",
        elec: 44,
        hot: 22,
        c: 8
    },
    {
        name: "平平技術科技有限公司",
        building: "B2幢樓-1401室",
        elec: 70,
        hot: 45,
        c: 22
    }
]
function Energy() {
    const option: EChartsOption = {
        title: {
            text: '當日能源消耗'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['煤', '氣', '油', '電', '熱']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '煤',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '氣',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '油',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '電',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '熱',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    const option2: EChartsOption = {
        title: {
            text: '資源消耗總覽'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', "2024-06"]
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '水',
                type: 'bar',
                data: [40, 220, 378, 658, 1122, 1200]
            },
            {
                name: '電',
                type: 'bar',
                data: [20, 39, 443, 490, 559, 762]
            },
            {
                name: '熱',
                type: 'bar',
                data: [78, 167, 229, 330, 380, 420]
            }
        ]
    };
    const option3: EChartsOption = {
        legend: {
            top: 'left'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [30, 100],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    { value: 40, name: '工廠用電' },
                    { value: 38, name: '工廠用煤' },
                    { value: 32, name: '員工充電' },
                    { value: 30, name: '日常照明' },
                    { value: 28, name: '設備未關' },
                    { value: 26, name: '光伏發電' },
                ]
            }
        ]
    };

    return <div className="dashboard">
        <Row gutter={16} className="mt">
            <Col span={12}>
                <Card title="能源消耗情況" >
                    <ReactECharts option={option} />
                </Card>
            </Col>
            <Col span={12}>
                <Card title="消耗總覽" >
                    <ReactECharts option={option2} />
                </Card>
            </Col>
        </Row>
        <Row gutter={16} className="mt" >
            <Col span={12} >
                <Card title="能源消耗佔比" style={{ height: "400px" }}>
                    <ReactECharts option={option3} />
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <Table<EnterpriseEnergyData> columns={columns} dataSource={data} pagination={false} />
                </Card>

            </Col>
        </Row>
    </div>
}
export default Energy