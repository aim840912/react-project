import type { ColumnsType } from "antd/es/table";
import { EnterpriseEnergyData } from "./types";

export const energyColumns: ColumnsType<EnterpriseEnergyData> = [
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

export const energyData: EnterpriseEnergyData[] = [
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