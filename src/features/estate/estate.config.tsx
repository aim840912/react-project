import type { TableProps } from 'antd';
import { Button, Image } from "antd";
import come from "../../assets/come.jpg"; // 圖片路徑可能需要根據新檔案位置調整
import { EstateRecordDataType, InParkCatDataType } from "./types";

export const chargeRecordColumns: TableProps<EstateRecordDataType>['columns'] = [
    {
        title: "No.",
        key: "index",
        render: (_text, _record, index) => index + 1,
    },
    {
        title: '訂單編號',
        dataIndex: 'orderNo',
        key: 'orderNo',

    },
    {
        title: '訂單日期',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: '車牌號碼',
        dataIndex: 'carNo',
        key: 'carNo',
    },
    {
        title: '車輛類型',
        dataIndex: 'type',
        key: 'type',

    },
    {
        title: '充電開始時間',
        dataIndex: 'startDate',
        key: 'startDate',
    },
    {
        title: '充電時長',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '充電量',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: '充電費用',
        dataIndex: 'cost',
        key: 'cost',
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (_text, _record) => {
            return <>
                <Button type="primary" size="small">查看</Button>
            </>
        }
    },

];

export const inParkCarColumns: TableProps<InParkCatDataType>['columns'] = [
    {
        title: "No.",
        key: "index",
        render: (text, record, index) => index + 1,
    },
    {
        title: '車牌號',
        dataIndex: 'carNo',
        key: 'carNo',

    },
    {
        title: '車主姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '車主電話',
        dataIndex: 'tel',
        key: 'tel',
    },
    {
        title: '租賃類型',
        dataIndex: 'type',
        key: 'type',

    },
    {
        title: '租期剩餘',
        dataIndex: 'rest',
        key: 'rest',
    },
    {
        title: '超期天數',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '入場照片',
        dataIndex: 'pic',
        key: 'pic',
        render: () => <Image
            src={come}
            width={50}
            placeholder={
                <Image
                    preview={false}
                    src={come}
                    width={150}
                />
            }
        />
    },

    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: () => {
            return <>
                <Button type="primary" size="small" className='mr'>編輯</Button>
                <Button type="primary" size="small" danger>刪除</Button>
            </>
        }
    },
];

export const chargeRecordData: EstateRecordDataType[] = [
    {
        key: '1',
        orderNo: 'CD9872380',
        date: "2024-02-13",
        carNo: '京A88888',
        type: "自有車輛",
        startDate: "2024-02-13 15:33:12",
        time: "2小時25分鐘",
        count: "30kw",
        cost: "¥40.50"
    },
    {
        key: '2',
        orderNo: 'CD9872380',
        date: "2024-02-13",
        carNo: '京A88888',
        type: "自有車輛",
        startDate: "2024-02-13 15:33:12",
        time: "2小時25分鐘",
        count: "30kw",
        cost: "¥40.50"
    },
    {
        key: '3',
        orderNo: 'CD9872380',
        date: "2024-02-13",
        carNo: '京A88888',
        type: "自有車輛",
        startDate: "2024-02-13 15:33:12",
        time: "2小時25分鐘",
        count: "30kw",
        cost: "¥40.50"
    },
    {
        key: '4',
        orderNo: 'CD9872380',
        date: "2024-02-13",
        carNo: '京A88888',
        type: "自有車輛",
        startDate: "2024-02-13 15:33:12",
        time: "2小時25分鐘",
        count: "30kw",
        cost: "¥40.50"
    },
    {
        key: '5',
        orderNo: 'CD9872380',
        date: "2024-02-13",
        carNo: '京A88888',
        type: "自有車輛",
        startDate: "2024-02-13 15:33:12",
        time: "2小時25分鐘",
        count: "30kw",
        cost: "¥40.50"
    },
    {
        key: '6',
        orderNo: 'CD9872380',
        date: "2024-02-13",
        carNo: '京A88888',
        type: "自有車輛",
        startDate: "2024-02-13 15:33:12",
        time: "2小時25分鐘",
        count: "30kw",
        cost: "¥40.50"
    },
    {
        key: '7',
        orderNo: 'CD9872380',
        date: "2024-02-13",
        carNo: '京A88888',
        type: "自有車輛",
        startDate: "2024-02-13 15:33:12",
        time: "2小時25分鐘",
        count: "30kw",
        cost: "¥40.50"
    },
    {
        key: '8',
        orderNo: 'CD9872380',
        date: "2024-02-13",
        carNo: '京A88888',
        type: "自有車輛",
        startDate: "2024-02-13 15:33:12",
        time: "2小時25分鐘",
        count: "30kw",
        cost: "¥40.50"
    },

];

export const inParkCarData: InParkCatDataType[] = [
    {
        key: '1',
        carNo: '京A88888',
        name: "王麗",
        tel: "18876543210",
        type: '長租車',
        rest: "135天",
        time: "0天",
        pic: "",
    },
    {
        key: '2',
        carNo: '京A88888',
        name: "王麗",
        tel: "18876543210",
        type: '長租車',
        rest: "135天",
        time: "0天",
        pic: "",
    },
    {
        key: '3',
        carNo: '京A88888',
        name: "王麗",
        tel: "18876543210",
        type: '長租車',
        rest: "135天",
        time: "0天",
        pic: "",
    },
    {
        key: '4',
        carNo: '京A88888',
        name: "王麗",
        tel: "18876543210",
        type: '長租車',
        rest: "135天",
        time: "0天",
        pic: "",
    },
    {
        key: '5',
        carNo: '京A88888',
        name: "王麗",
        tel: "18876543210",
        type: '長租車',
        rest: "135天",
        time: "0天",
        pic: "",
    },
    {
        key: '6',
        carNo: '京A88888',
        name: "王麗",
        tel: "18876543210",
        type: '長租車',
        rest: "135天",
        time: "0天",
        pic: "",
    },
    {
        key: '7',
        carNo: '京A88888',
        name: "王麗",
        tel: "18876543210",
        type: '長租車',
        rest: "135天",
        time: "0天",
        pic: "",
    },
    {
        key: '8',
        carNo: '京A88888',
        name: "王麗",
        tel: "18876543210",
        type: '長租車',
        rest: "135天",
        time: "0天",
        pic: "",
    },
];
