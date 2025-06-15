import type { TreeDataNode } from 'antd';
import { Button, Popconfirm, type ButtonProps } from "antd";
import { SettingsDataType, MenuType } from "./types";
import React from "react";
import { CheckPermission } from '../../components/CheckPermission';

interface GetColumnsParams {
    onEdit: (menu: MenuType[], accountName: string) => void;
}

export const getSettingsColumns = ({ onEdit }: GetColumnsParams) => [
    {
        title: "No.",
        key: "index",
        render: (_text: unknown, _record: SettingsDataType, index: number) => index + 1,
    },
    {
        title: "帳號名稱",
        dataIndex: "accountName",
        key: "accountName",
    },
    {
        title: "所屬權限",
        dataIndex: "auth",
        key: "auth",
    },
    {
        title: "使用人",
        dataIndex: "person",
        key: "person",
    },
    {
        title: "使用人電話",
        dataIndex: "tel",
        key: "tel",
    },
    {
        title: "所屬部門",
        dataIndex: "department",
        key: "department",
    },
    {
        title: "操作",
        key: "operate",
        render(_: any, record: SettingsDataType) {
            return (
                <>
                    <Button size="small" type="primary" className="mr" onClick={() => onEdit(record.menu, record.accountName)}>
                        修改權限
                    </Button>
                    {/* 在這裡直接使用 CheckPermission 元件 */}
                    <CheckPermission required={['delete']}>
                        <Popconfirm
                            title={`您確認要刪除 ${record.accountName} 嗎？`}
                            onConfirm={() => console.log("執行刪除", record.id)}
                        >
                            <Button type="link" danger>
                                刪除
                            </Button>
                        </Popconfirm>
                    </CheckPermission>
                </>
            );
        },
    }
];



export const treeData: TreeDataNode[] = [
    {
        title: '工作台',
        key: '/dashboard',
    },
    {
        title: '租戶管理',
        key: '/users',
        children: [
            { title: '租戶列表', key: '/users/list' },
            { title: '新增租戶', key: '/users/add' },
        ],
    },
    {
        title: '物業管理',
        key: '/estate',
        children: [
            {
                title: "樓宇管理",
                key: "/estate/tenement"
            },
            {
                title: "房間管理",
                key: "/estate/room"
            },
            {
                title: "車輛信息",
                key: "/estate/car"
            }

        ]
    },
    {
        title: '報修管理',
        key: '/repair',
    },
    {
        title: '財務管理',
        key: '/finance',
        children: [
            {
                title: "合同管理",
                key: "/finance/contract"
            },
            {
                title: "合同詳情",
                key: "/finance/surrender"
            },
            {
                title: "帳單管理",
                key: "/finance/bill"
            }
        ]
    },
    {
        title: '招商管理',
        key: '/merchants',
    },
    {
        title: '運營管理',
        key: '/operation',
        children: [
            {
                title: "運營總覽",
                key: "/operation/all"
            },
            {
                title: "文章發布",
                key: "/operation/article"
            },
            {
                title: "內容評論",
                key: "/operation/comments"
            }
        ]
    },
    {
        title: '設備管理',
        key: '/equipment',
    },
    {
        title: '能源消耗',
        key: '/energy',
    },
    {
        title: '系統設置',
        key: "/settings",
    },
    {
        title: '個人中心',
        key: "/personal",
    },
];

