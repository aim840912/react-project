import type { EChartsOption } from 'echarts';

// 圖表一：當日能源消耗
export const dailyEnergyOption: EChartsOption = {
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

// 圖表二：資源消耗總覽
export const overviewOption: EChartsOption = {
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

// 圖表三：南丁格爾圖
export const pieChartOption: EChartsOption = {
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