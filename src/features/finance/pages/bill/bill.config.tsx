import { Button, Tag, TableProps } from "antd"
import { BillDataType } from "../../types";

export const billColumns: TableProps<BillDataType>["columns"] = [
    {
        title: "No.",
        key: "index",
        render(value, record, index) {
            return index + 1
        },
        width: 100,
        fixed: "left"
    },
    {
        title: "帳單號",
        dataIndex: "accountNo",
        key: "accountNo",
        width: 150,
    },
    {
        title: "繳費狀態",
        dataIndex: "status",
        key: "status",
        width: 100,
        render(value) {
            return value === 1 ? <Tag color="green">已繳費</Tag> : <Tag color="red">未繳費</Tag>
        }
    },
    {
        title: "房屋號",
        dataIndex: "roomNo",
        key: "roomNo",
        width: 100,
    },
    {
        title: "車位號",
        dataIndex: "carNo",
        key: "carNo",
        width: 100,
    },
    {
        title: "手機號",
        dataIndex: "tel",
        key: "tel",
        width: 150,
    },
    {
        title: "物業費(年)",
        dataIndex: "costName1",
        key: "costName1",
        width: 150,
    },

    {
        title: "車位費",
        dataIndex: "costName2",
        key: "costName2",
        width: 150,
    },
    {
        title: "房屋租金",
        dataIndex: "costName3",
        key: "costName3",
        width: 150,
    },

    {
        title: "開始時間",
        dataIndex: "startDate",
        key: "startDate",
        width: 150,
    },
    {
        title: "結束時間",
        dataIndex: "endDate",
        key: "endDate",
        width: 150,
    },
    {
        title: "優惠金額",
        dataIndex: "preferential",
        key: "preferential",
        width: 150,
    },
    {
        title: "合計應收金額",
        dataIndex: "money",
        key: "money",
        width: 150,
    },
    {
        title: "支付方式",
        dataIndex: "pay",
        key: "pay",
        width: 100,
    },
    {
        title: "操作",
        width: 230,
        key: "operate",
        fixed: "right",
        render(_value) {
            return <>
                <Button type="primary" size="small">打印</Button>
                <Button type="primary" size="small" danger className="ml mr">帳單作廢</Button>
                <Button type="primary" size="small">退款</Button>
            </>
        }
    }
]