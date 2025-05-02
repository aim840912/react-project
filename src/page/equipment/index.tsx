import { Card, Table, Row, Col, Input, Button, Pagination, Tag } from "antd"
import { TableProps } from "antd";
import useDataList from "../../hooks/useDataList";
import { getEquipmentList } from "../../api/equipment";
interface SearchType {
    name: string;
    person: string;
}
interface DataType {
    id: number
    no: string,
    name: string;
    person: string;
    tel: number;
    time: string;
    rest: string;
    status: string;
    last: string;
    type: string;
    from: string
}

interface EquipmentListResponse {
    list: DataType[];
    total: number;
}

const columns: TableProps<DataType>["columns"] = [
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

function Equipment() {
    const {
        dataList,
        page,
        pageSize,
        total,
        loading,
        formData,
        loadData,
        onChange,
        handleChange,
        reset
    } = useDataList<SearchType, DataType>({ name: "", person: "" }, getEquipmentList)
    return <div>
        <Card className="search">
            <Row gutter={16}>
                <Col span={7}>
                    <p>設備名稱：</p>
                    <Input value={formData.name} name="name" placeholder="請輸入設備名稱或編號" onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>負責人：</p>
                    <Input value={formData.person} name="person" placeholder="請輸入負責人姓名" onChange={handleChange} />
                </Col>
                <Col span={3}>
                    <Button type="primary" className="mr" onClick={loadData}>查詢</Button>
                    <Button onClick={reset}>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Table
                columns={columns}
                dataSource={dataList}
                loading={loading}
                rowKey={(record) => record.id}
                pagination={false}
            />
            <Pagination className="fr mt" showQuickJumper defaultCurrent={1} total={total} onChange={onChange} current={page} pageSize={pageSize} />
        </Card>
    </div>
}

export default Equipment
