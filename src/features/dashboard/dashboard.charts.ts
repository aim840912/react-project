import type { EChartsOption } from 'echarts';

export const initialOption: EChartsOption = {
    title: { text: "當日能源消耗" },
    tooltip: { trigger: "axis" },
    legend: { data: [] },
    grid: {
        left: "%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
    },
    toolbox: { feature: { saveAsImage: {} } },
    xAxis: {
        type: "category" as const,
        boundaryGap: false,
        data: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00", "24:00"],
    },
    yAxis: { type: "value" },
    series: [],
};


export const option: EChartsOption = {
    title: {
        text: '企業資質情況(家)'
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
        data: ['2014', '2016', '2018', '2020', '2022', "2024"]
    },
    yAxis: {
        type: 'value',

    },
    series: [
        {
            name: '科技企業',
            type: 'bar',
            data: [40, 220, 378, 658, 1122, 1200]
        },
        {
            name: '高新企業',
            type: 'bar',
            data: [20, 39, 443, 490, 559, 762]
        },
        {
            name: '國營企業',
            type: 'bar',
            data: [78, 167, 229, 330, 380, 420]
        }
    ]
};

export const nightingaleOption: EChartsOption = {
    legend: {
        top: '10px'
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
                { value: 40, name: '在營' },
                { value: 38, name: '已租' },
                { value: 32, name: '出租' },
                { value: 30, name: '續簽' },
                { value: 28, name: '新簽' },
                { value: 26, name: '待租' },
                { value: 22, name: '退租' },
            ]
        }
    ]
};