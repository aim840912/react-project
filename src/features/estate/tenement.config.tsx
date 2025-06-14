import { Button, Tag, Progress, Badge } from "antd"
import { TableProps } from "antd"
import { EstateDataType } from "./types"

export const estateColumns: TableProps<EstateDataType>['columns'] = [
    {
        title: "No.",
        key: "index",
        render: (value, record, index) => index + 1
    },
    {
        title: "樓宇名稱",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "負責人",
        dataIndex: "person",
        key: "person"
    },
    {
        title: "負責人電話",
        dataIndex: "tel",
        key: "tel"
    },
    {
        title: "使用狀態",
        dataIndex: "status",
        key: "status",
        render: (value) => {
            if (value === 1) {
                return <Tag color="#f50">建設中</Tag>
            } else if (value === 2) {
                return <Tag color="#2db7f5">已竣工</Tag>
            } else {
                return <Tag color="#87d068">使用中</Tag>
            }
        }
    },
    {
        title: "空置率",
        dataIndex: "vacancyRate",
        key: "vacancyRate",
        render(value) {
            return <Progress percent={value} status="active" />
        }
    },
    {
        title: "物業費率",
        dataIndex: "propertyFee",
        key: "propertyFee",
        render(value) {
            return <Badge color="green" text={value}></Badge>
        }
    },
    {
        title: "操作",
        key: "operate",
        render(_value) {
            return <>
                <Button type="primary" className="mr">編輯</Button>
                <Button type="primary" danger>刪除</Button>
            </>
        }
    },
]
export const estateData: EstateDataType[] = [
    {
        key: '1',
        name: 'A1幢寫字樓',
        person: "王達",
        tel: '16654789654',
        status: "建設中",
        vacancyRate: 60,
        propertyFee: "3.5%",
    },
    {
        key: '2',
        name: 'A2幢寫字樓',
        person: "蘇樂凱",
        tel: '13698756669',
        status: "已竣工",
        vacancyRate: 40,
        propertyFee: "3.8%",
    },
    {
        key: '3',
        name: 'B1幢寫字樓',
        person: "莉亞",
        tel: '15587966698',
        status: "使用中",
        vacancyRate: 20,
        propertyFee: "3.1%",
    },
    {
        key: '4',
        name: 'B2幢寫字樓',
        person: "常可",
        tel: '13698756324',
        status: "使用中",
        vacancyRate: 30,
        propertyFee: "4.0%",
    },
    {
        key: '5',
        name: 'C1幢寫字樓',
        person: "劉偉",
        tel: '19878965444',
        status: "使用中",
        vacancyRate: 50,
        propertyFee: "3.5%",
    },
    {
        key: '6',
        name: 'C2幢寫字樓',
        person: "孫強浩",
        tel: '13369888562',
        status: "使用中",
        vacancyRate: 10,
        propertyFee: "2.9%",
    },
    {
        key: '7',
        name: '天匯國際大廈A座',
        person: "馬浩瀚",
        tel: '13578549687',
        status: "使用中",
        vacancyRate: 25,
        propertyFee: "3.7%",
    },
    {
        key: '8',
        name: '時代金融廣場',
        person: "楊柳",
        tel: '18745889874',
        status: "使用中",
        vacancyRate: 15,
        propertyFee: "3.3%",
    },

];