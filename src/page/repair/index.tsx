import { Card, Table, Button, Row, Col, Input, Tag } from "antd"
import type { TableProps } from 'antd';
interface DataType {
    key: string;
    orderNo: string;
    name: string;
    tel: string;
    address: string;
    description: string;
    status: string;
    time: string;
}
const columns: TableProps<DataType>['columns'] = [
    {
        title: "No.",
        key: "index",
        render: (text, record, index) => index + 1,
    },
    {
        title: '維修單號',
        dataIndex: 'orderNo',
        key: 'orderNo',

    },
    {
        title: '報修人',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '報修人電話',
        dataIndex: 'tel',
        key: 'tel',
    },
    {
        title: '報修地址',
        dataIndex: 'address',
        key: 'address',

    },
    {
        title: '故障描述',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '維修狀態',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            if (text === 1) {
                return <Tag color="#f50">待維修</Tag>
            } else if (text === 2) {
                return <Tag color="#2db7f5">維修中</Tag>
            } else {
                return <Tag color="green">已完成</Tag>
            }
        }
    },
    {
        title: '報修時間',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => {
            if (record.status === "1") {
                return <>
                    <Button type="primary" size="small">指派</Button>
                </>
            } else if (record.status === "2") {
                return <span className="text-gray">維修中...</span>;
            } else {
                return <Button type="primary" size="small">完成</Button>
            }


        }
    },

];

const data: DataType[] = [
    {
        key: '1',
        orderNo: 'BX1236984',
        name: "劉寬",
        tel: '13498765432',
        address: "A2幢寫字樓502",
        description: "空調製冷問題,間斷性製冷，且製冷效果不佳",
        status: "1",
        time: "2024-05-30 13:37",
    },
    {
        key: '2',
        orderNo: 'BX1236984',
        name: "劉寬",
        tel: '13498765432',
        address: "A2幢寫字樓502",
        description: "空調製冷問題,間斷性製冷，且製冷效果不佳",
        status: "2",
        time: "2024-05-30 13:37",
    },
    {
        key: '3',
        orderNo: 'BX1236984',
        name: "劉寬",
        tel: '13498765432',
        address: "A2幢寫字樓502",
        description: "空調製冷問題,間斷性製冷，且製冷效果不佳",
        status: "3",
        time: "2024-05-30 13:37",
    },
    {
        key: '4',
        orderNo: 'BX1236984',
        name: "劉寬",
        tel: '13498765432',
        address: "A2幢寫字樓502",
        description: "空調製冷問題,間斷性製冷，且製冷效果不佳",
        status: "1",
        time: "2024-05-30 13:37",
    },
    {
        key: '5',
        orderNo: 'BX1236984',
        name: "劉寬",
        tel: '13498765432',
        address: "A2幢寫字樓502",
        description: "空調製冷問題,間斷性製冷，且製冷效果不佳",
        status: "3",
        time: "2024-05-30 13:37",
    },
    {
        key: '6',
        orderNo: 'BX1236984',
        name: "劉寬",
        tel: '13498765432',
        address: "A2幢寫字樓502",
        description: "空調製冷問題,間斷性製冷，且製冷效果不佳",
        status: "2",
        time: "2024-05-30 13:37",
    },

];
function Repair() {
    return <div>
        <Card>
            <Row>
                <Col span={8}>
                    <Input placeholder="請輸入維修單號" />
                </Col>
                <Col span={8}>
                    <Button type='primary' className='ml'>查詢</Button>
                </Col>
            </Row>

        </Card>
        <Card className="mt">
            <Table dataSource={data} columns={columns} />
        </Card>
    </div>
}

export default Repair
