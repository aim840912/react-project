import { Card, Table, Typography, Tag, Button, Popconfirm, message } from 'antd';
import type { TableProps } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectAllLogs, clearLogs, LogEntry } from '../logSlice';

const { Text, Paragraph } = Typography;

const LogPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const logs = useAppSelector(selectAllLogs);

    const handleClearLogs = () => {
        dispatch(clearLogs());
        message.success('日誌已成功清除');
    };

    const columns: TableProps<LogEntry>['columns'] = [
        {
            title: '時間',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (text: string) => new Date(text).toLocaleString(),
            sorter: (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
            defaultSortOrder: 'descend',
        },
        {
            title: '使用者',
            dataIndex: 'username',
            key: 'username',
            render: (text: string) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text: string) => <Text strong>{text}</Text>,
        },
        {
            title: '詳細資訊',
            dataIndex: 'details',
            key: 'details',
            render: (details: Record<string, any>) => (
                <Paragraph code copyable>
                    {JSON.stringify(details)}
                </Paragraph>
            ),
        },
    ];

    return (
        <Card
            title="系統操作日誌"
            extra={
                <Popconfirm
                    title="確定要清除所有日誌嗎？"
                    description="此操作不可復原。"
                    onConfirm={handleClearLogs}
                    okText="確定"
                    cancelText="取消"
                >
                    <Button danger type="primary">
                        清除日誌
                    </Button>
                </Popconfirm>
            }
        >
            <Table
                columns={columns}
                dataSource={logs}
                rowKey="id"
                pagination={{ pageSize: 15 }}
            />
        </Card>
    );
};

export default LogPage;