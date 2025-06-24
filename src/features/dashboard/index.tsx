import "./index.scss";
import { EnergyChartSeries, EnergyItem } from '@/features/energy/types';
import { useLoadEnergyDataQuery } from "@/features/dashboard/api/dashboardApi";
import { initialOption, option, nightingaleOption } from '@/features/dashboard/dashboard.charts';
import { Card, Progress, Statistic, Timeline, Tag } from "antd";
import { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { RadarChartOutlined, SnippetsOutlined, DollarOutlined, LaptopOutlined } from "@ant-design/icons";
import { Responsive, WidthProvider } from "react-grid-layout";
import type { EChartsOption } from 'echarts';
import type { Layout } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

function Dashboard() {
    const { data: energyData, isLoading } = useLoadEnergyDataQuery();

    const initialLayouts: { lg: Layout[] } = {
        lg: [
            { i: "a", x: 0, y: 0, w: 3, h: 1 },
            { i: "b", x: 3, y: 0, w: 3, h: 1 },
            { i: "c", x: 6, y: 0, w: 3, h: 1 },
            { i: "d", x: 9, y: 0, w: 3, h: 1 },
            { i: "e", x: 0, y: 2, w: 6, h: 4 },
            { i: "f", x: 6, y: 2, w: 6, h: 4 },
            { i: "g", x: 0, y: 6, w: 6, h: 4 },
            { i: "h", x: 6, y: 6, w: 3, h: 4 },
            { i: "i", x: 9, y: 6, w: 3, h: 4 },
        ],
    };

    const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>(initialLayouts);

    const onLayoutChange = (layout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
        setLayouts(allLayouts);
        // localStorage.setItem('dashboard-layouts', JSON.stringify(allLayouts));
    };

    const chartOption: EChartsOption = useMemo(() => {
        if (!energyData) {
            return initialOption;
        }

        const dataList: EnergyChartSeries[] = energyData.map((item: EnergyItem) => ({
            name: item.name,
            data: item.data,
            type: "line",
            stack: "Total"
        }));

        return {
            ...initialOption,
            legend: {
                data: dataList.map((item: EnergyChartSeries) => item.name),
            },
            series: dataList
        };
    }, [energyData]);
    return (
        <div className="dashboard">
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={100}
                onLayoutChange={onLayoutChange}
            >
                <div key="a">
                    <Card className="clearfix  h-full" >
                        <div className="fl area">
                            <h2>13479</h2>
                            <p>園區總面積(平方米)</p>
                        </div>
                        <div className="fr">
                            <RadarChartOutlined className="icon" />
                        </div>
                    </Card>
                </div>
                <div key="b">
                    <Card className="clearfix h-full">
                        <div className="fl area">
                            <h2>8635</h2>
                            <p>總租賃面積(平方米)</p>
                        </div>
                        <div className="fr">
                            <SnippetsOutlined className="icon" style={{ color: "#81c452" }} />
                        </div>
                    </Card>
                </div>
                <div key="c">
                    <Card className="clearfix h-full">
                        <div className="fl area">
                            <h2>38764</h2>
                            <p>園區總產值(萬元)</p>
                        </div>
                        <div className="fr">
                            <DollarOutlined className="icon" style={{ color: "#62c9cb" }} />
                        </div>
                    </Card>
                </div>
                <div key="d">
                    <Card className="clearfix h-full">
                        <div className="fl area">
                            <h2>2874</h2>
                            <p>入駐企業總數(家)</p>
                        </div>
                        <div className="fr">
                            <LaptopOutlined className="icon" style={{ color: "#e49362" }} />
                        </div>
                    </Card>
                </div>

                <div key="e" className="mt">
                    <Card title="能源消耗情況">
                        <ReactECharts option={chartOption} showLoading={isLoading} />
                    </Card>
                </div>
                <div key="f" className="mt">
                    <Card title="企業資質情況">
                        <ReactECharts option={option} />
                    </Card>
                </div>


                <div key="g">
                    <Card title="租賃情況">
                        <ReactECharts option={nightingaleOption} />
                    </Card>
                </div>

                <div key="h">
                    <Card title="充電樁空閒統計">
                        <div className="wrap">
                            <Progress type="circle" percent={75} />
                            <Statistic title="總充電樁數" value={75} suffix="/ 100" className="mt" />
                        </div>
                    </Card>
                </div>

                <div key="i">
                    <Card title="實時車輛信息" style={{ height: "406px" }}>
                        <Timeline items={[
                            { key: 'timeline-item-1', children: <><Tag color="green">進場</Tag>08:24車輛 京A66666</> },
                            { key: 'timeline-item-2', children: <><Tag color="red">出場</Tag>09:15 車輛 京A66666</>, color: 'red' },
                            { key: 'timeline-item-3', children: <><Tag color="green">進場</Tag>09:22 車輛 京A23456</> },
                            { key: 'timeline-item-4', children: <><Tag color="red">出場</Tag>10:43 車輛 京A18763</>, color: 'red' },
                            { key: 'timeline-item-5', children: <><Tag color="green">進場</Tag>13:38 車輛 京A88888</> },
                            { key: 'timeline-item-6', children: <><Tag color="green">進場</Tag>14:46 車輛 京A23456</> },
                        ]} />
                    </Card>
                </div>

            </ResponsiveGridLayout>
        </div>
    );
}

export default Dashboard;