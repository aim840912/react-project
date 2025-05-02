const menuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租戶管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物業管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "樓宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房間管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "車輛信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "報修管理",
        "key": "/repair"
    },
    {
        "icon": "DollarOutlined",
        "label": "財務管理",
        "key": "/finance",
        "children": [
            {

                "icon": "ProfileOutlined",
                "label": "合同管理",
                "key": "/finance/contract",

            },
            {
                "icon": "FrownOutlined",
                "label": "合同詳情",
                "key": "/finance/surrender",
            },
            {
                "icon": "FileTextOutlined",
                "label": "帳單管理",
                "key": "/finance/bill",
            }
        ]
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "營運管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "運營總覽",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章發布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "內容評論",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "設備管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系統設置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "個人中心",
        "key": "/personal",
    }
]
const userMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租戶管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物業管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "樓宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房間管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "車輛信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "報修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "設備管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "個人中心",
        "key": "/personal",
    }
]
const managerMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租戶管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物業管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "樓宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房間管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "車輛信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "報修管理",
        "key": "/repair"
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "營運管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "運營總覽",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章發布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "內容評論",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "設備管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系統設置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "個人中心",
        "key": "/personal",
    }
]
const customizeMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租戶管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租戶列表",
                "key": "/users/list",
            },
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物業管理",
        "key": "/estate",
        "children": [
            {
                "icon": "InsertRowLeftOutlined",
                "label": "樓宇管理",
                "key": "/estate/tenement",
            },

        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "報修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "設備管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "個人中心",
        "key": "/personal",
    }
]

import type { VercelRequest, VercelResponse } from '@vercel/node';

const menuMap = {
    admin: menuList,
    manager: managerMenuList,
    user: userMenuList,
};

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const auth = req.headers.authorization?.replace('Bearer ', '');

    if (auth?.includes('admin')) return res.status(200).json({ data: menuMap.admin });
    if (auth?.includes('manager')) return res.status(200).json({ data: menuMap.manager });
    if (auth?.includes('user')) return res.status(200).json({ data: menuMap.user });

    return res.status(200).json({ data: [] });
}
