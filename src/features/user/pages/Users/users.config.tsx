import { Button, Popconfirm, Tag, type TableProps } from "antd";
import { User } from "../../types";

// 定義傳入的事件處理函式型別
interface ColumnsParams {
    onEdit: (record: User) => void;
    onDelete: (id: string) => void;
}

export const getUsersColumns = ({ onEdit, onDelete }: ColumnsParams): TableProps<User>['columns'] => [
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
            if (value === '1') {
                return <Tag color="green">營業中</Tag>
            } else if (value === '2') {
                return <Tag color="#f50">暫停營業</Tag>
            } else if (value === '3') {
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
        render(_value, record) {
            return (
                <>
                    <Button type="primary" size="small" onClick={() => onEdit(record)}>編輯</Button>
                    <Popconfirm
                        title="刪除確認"
                        description="確定要刪除嗎"
                        okText="是"
                        cancelText="否"
                        onConfirm={() => onDelete(record.id)}
                    >
                        <Button type="primary" danger className="ml" size="small">刪除</Button>
                    </Popconfirm>
                </>
            );
        },
    },
];