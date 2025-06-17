import { Button, Tag } from "antd"
import { TableProps } from "antd";
import { EquipmentDataType } from "./types";

export const equipmentColumns: TableProps<EquipmentDataType>["columns"] = [
    {
        title: "No.",
        key: "index",
        render: (text, record, index) => index + 1,
    },
    {
        title: '設備名稱',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '設備編號',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: '負責人',
        dataIndex: 'person',
        key: 'person',
    },
    {
        title: '負責人電話',
        dataIndex: 'tel',
        key: 'tel',
    },
    {
        title: '理論壽命',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '剩餘壽命',
        dataIndex: 'rest',
        key: 'rest',
    },
    {
        title: '使用狀態',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            if (text === 1) {
                return <Tag color="green">使用中</Tag>
            } else if (text === 2) {
                return <Tag color="yellow">維護中</Tag>
            } else {
                return <Tag color="red">已損壞</Tag>
            }
        }
    },
    {
        title: '最近保養日期',
        dataIndex: 'last',
        key: 'last',
    },
    {
        title: '規格型號',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '生產廠家',
        dataIndex: 'from',
        key: 'from',
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: () => {
            return <Button type="primary" size="small">詳細</Button>
        }
    },
]