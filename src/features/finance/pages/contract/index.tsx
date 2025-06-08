import { Card, Table, Row, Col, Input, Button, Tag, Pagination, TableProps, PaginationProps } from "antd"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router";
import { ContractDataType, ContractSearchType } from "../../../../types";
import { useGetContractsQuery, useUpdateContractMutation } from '../../api/contractApi';

function Dashboard() {
    const [formData, setFormData] = useState<ContractSearchType>({
        contractNo: "",
        person: "",
        tel: ""
    });

    const [page, setPage] = useState<number>(1);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isReturn = searchParams.get("return");
    const [pageSize, setPageSize] = useState<number>(10);
    const {
        data,    // 後端回傳的合約陣列（或 undefined）
        error,              // 如果有錯誤，就會放在這裡
        isLoading,          // 載入狀態
        isFetching,         // 重新抓取時也會是 true
        refetch,            // 可以手動觸發重新抓取
    } = useGetContractsQuery({ ...formData, page, pageSize })

    const [updateFormList, { isLoading: isUpdating, error: updateError }] = useUpdateContractMutation()

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        // 2. 把 setFormData、updateForm 一併放到同一個 functional update 裡
        setFormData(prev => {
            const newState = { ...prev, [name]: value }

            // 3. 直接呼叫 RTK Query mutation
            //    你可以使用 unwrap() 來方便在 try/catch 處理錯誤，
            //    也可以不 unwrap()，改用 .then/.catch
            updateFormList({
                id: newState.contractNo,
                data: {
                    person: newState.person,
                    tel: newState.tel,
                    page: newState.page || 1,
                    pageSize: newState.pageSize || 10
                }
            })
                .unwrap()
                .then(res => {
                    console.log('更新後端成功:', res)
                })
                .catch(err => {
                    console.error('更新後端失敗:', err)
                })

            return newState
        })
    }

    const detail = (contractNo: string) => {
        navigate("/finance/surrender?contractNo=" + contractNo);
    };

    const columns: TableProps<ContractDataType>["columns"] = [
        { title: "No.", key: "index", render(value, record, index) { return index + 1; } },
        { title: "合同編號", dataIndex: "contractNo", key: "contractNo" },
        { title: "合同類別", dataIndex: "type", key: "type" },
        { title: "合同名稱", dataIndex: "name", key: "name" },
        { title: "合同開始日期", dataIndex: "startDate", key: "startDate" },
        { title: "合同結束如期", dataIndex: "endDate", key: "endDate" },
        { title: "甲方", dataIndex: "jia", key: "jia" },
        { title: "乙方", dataIndex: "yi", key: "yi" },
        {
            title: "審批狀態",
            dataIndex: "status",
            key: "status",
            render(value) {
                if (value === 1) return <Tag>未審批</Tag>;
                if (value === 2) return <Tag color="green">審批通過</Tag>;
                return <Tag color="red">審批拒絕</Tag>;
            }
        },
        {
            title: "操作",
            key: "operate",
            render(_value: unknown, record: ContractDataType) {
                return <Button type="primary" size="small" onClick={() => detail(record.contractNo)}>合同詳情</Button>;
            }
        }
    ];

    const reset = () => {
        console.log(data);
        setFormData({ contractNo: "", person: "", tel: "" });
        setPage(1);
        setPageSize(10);
    }

    return <div>
        <Card className="search">
            <Row gutter={16}>
                <Col span={7}><p>合同編號：</p><Input name="contractNo" value={formData.contractNo} onChange={handleChange} /></Col>
                <Col span={7}><p>聯繫人：</p><Input name="person" value={formData.person} onChange={handleChange} /></Col>
                <Col span={7}><p>聯繫電話：</p><Input name="tel" value={formData.tel} onChange={handleChange} /></Col>
                <Col span={3}>
                    <Button type="primary" className="mr" onClick={() => refetch()}>查詢</Button>
                    <Button onClick={() => reset()}>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Table
                columns={columns}
                pagination={false}
                loading={isLoading}
                dataSource={data ? data.data.list : []}
                rowKey={(record) => record.contractNo}
            />
            <Pagination
                className="mt fr"
                showQuickJumper
                defaultCurrent={1}
                total={data?.data.total}
                onChange={() => setPage(page)}
                current={page}
                pageSize={pageSize}
            />
        </Card>
    </div>
}

export default Dashboard;
