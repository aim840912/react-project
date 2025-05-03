import { Card, Row, Col, Input, Button, Table, Pagination, Tag, Popconfirm, message } from "antd"
import type { TableProps, PaginationProps } from "antd"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { getUserList, batchDeleteUser, deleteUser } from "../../api/users"
import UserForm from "./userForm"
import { useDispatch } from "react-redux"
import { setUserData, emptyUserData } from "../../store/user/userSlice"
import { User, UserSearchType } from "../../types"

function Users() {
    const [dataList, setDataList] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [isModelOpen, setIsModalOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const dispatch = useDispatch()
    const [formData, setFormData] = useState<UserSearchType>({
        page: 1,
        pageSize: 20,
        companyName: "",
        contact: "",
        tel: "",
    })

    const disabled = useMemo(() => {
        return selectedRowKeys.length ? false : true
    }, [selectedRowKeys])

    const loadData = useCallback(async () => {
        setLoading(true)
        const response = await getUserList({ ...formData, page, pageSize });

        if (!response.data) return;

        const { list, total } = response.data;
        setDataList(list)
        setTotal(total)
        setLoading(false)
    }, [formData, page, pageSize])

    useEffect(() => {
        loadData()
    }, [loadData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const OnSelectChange = (selectedRowKeys: React.Key[], _selectedRows: User[]) => {
        setSelectedRowKeys(selectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: OnSelectChange
    }

    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
    }

    const reset = () => {
        setSelectedRowKeys([])
        setFormData({
            page: 1,
            pageSize: 20,
            companyName: "",
            contact: "",
            tel: ""
        })
        setPage(1)
        setPageSize(10)
        loadData()
    }

    const confirm = async function (id: string) {
        const { data } = await deleteUser(id)
        message.success(data as string) // Ensure data is cast to a string
        loadData()
    }

    const batchDelete = async () => {
        const { data } = await batchDeleteUser(selectedRowKeys)
        message.success(data as string) // Ensure data is cast to a string
        loadData()
    }

    const edit = (record: User) => {
        setIsModalOpen(true)
        setTitle("編輯企業");
        dispatch(setUserData(record))
    }

    const add = () => {
        setIsModalOpen(true)
        setTitle("新增企業");
        dispatch(setUserData(emptyUserData))
    }

    const hideModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const columns: TableProps<User>['columns'] = [
        {
            title: "No.",
            key: "index",
            render(value, record, index) {
                return index + 1
            },
        },
        {
            title: "客戶名稱",
            key: "name",
            dataIndex: "name"
        },
        {
            title: "經營狀態",
            key: "status",
            dataIndex: "status",
            render(value) {
                if (value === 1) {
                    return <Tag color="green">營業中</Tag>
                } else if (value === 2) {
                    return <Tag color="#f50">暫停營業</Tag>
                } else if (value === 3) {
                    return <Tag color="red">已關閉</Tag>
                }
            }
        },
        {
            title: "聯繫電話",
            key: "tel",
            dataIndex: "tel"
        },
        {
            title: "所屬行業",
            key: "business",
            dataIndex: "business"
        },
        {
            title: "郵箱",
            key: "email",
            dataIndex: "email"
        },
        {
            title: "統一信用代碼",
            key: "creditCode",
            dataIndex: "creditCode"
        },
        {
            title: "工商註冊號",
            key: "industryNum",
            dataIndex: "industryNum"
        },
        {
            title: "組織結構代碼",
            key: "organizationCode",
            dataIndex: "organizationCode"
        },
        {
            title: "法人名",
            key: "legalPerson",
            dataIndex: "legalPerson"
        },
        {
            title: "操作",
            key: "operate",
            render(_value, record, _index) {
                return <>
                    <Button type="primary" size="small" onClick={() => edit(record)}>編輯</Button>
                    <Popconfirm
                        title="刪除確認"
                        description="確定要刪除嗎"
                        okText="是"
                        cancelText="否"
                        onConfirm={() => confirm(record.id)}
                    >
                        <Button type="primary" danger className="ml" size="small">刪除</Button>
                    </Popconfirm>
                </>
            },
        },
    ]

    return <div className="users">
        <MyUserForm visible={isModelOpen} title={title} hideModal={hideModal} loadData={loadData} />
        <Card className="search">
            <Row gutter={16}>
                <Col span={7}>
                    <p>企業名稱:</p>
                    <Input name="companyName" value={formData.companyName} onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>聯絡人:</p>
                    <Input name="contact" value={formData.contact} onChange={handleChange} /></Col>
                <Col span={7}>
                    <p>連絡電話:</p>
                    <Input name="phone" value={formData.tel} onChange={handleChange} /></Col>
                <Col span={3}>
                    <Button type="primary" onClick={loadData}>查詢</Button>
                    <Button className="ml" onClick={reset}>重置</Button>
                </Col>
            </Row>
        </Card  >
        <Card className="mt tr">
            <Button type="primary" onClick={add}>新增企業</Button>
            <Button danger type="primary" className="ml" disabled={disabled} onClick={batchDelete}>批量刪除</Button>
        </Card>
        <Card className="mt">
            <Table columns={columns} dataSource={dataList} rowKey={(record) => record.id} loading={loading} rowSelection={rowSelection} pagination={false} />
            <Pagination
                className="fr mt"
                total={total}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 條`}
                onChange={onChange}
                current={page}
                pageSize={pageSize}
            />
        </Card>
    </div>
}

const MyUserForm = React.memo(UserForm)
export default Users
