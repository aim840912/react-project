import { faker } from '@faker-js/faker';

export function generateUsers(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        key: `user-${i + 1}`,
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 60 }),
        address: faker.location.city(),
    }));
}

export function generateEquipments(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: `equipment-${i + 1}`,
        name: `設備${i + 1}`,
        status: faker.helpers.arrayElement(['正常', '維修中', '報廢']),
    }));
}

export function generateUserList(count: number) {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        status: faker.helpers.arrayElement(['1', '2', '3']),
        tel: faker.phone.number(),
        business: faker.helpers.arrayElement(['製造業', '互聯網', '新媒體', '美業', '新能源', '物流', '電商']),
        email: faker.internet.email(),
        creditCode: faker.string.numeric(18),
        industryNum: faker.string.numeric(15),
        organizationCode: faker.string.alphanumeric(9).toUpperCase(),
        legalPerson: faker.person.fullName()
    }));
}

export function generateRoomList() {
    const rooms = [];

    for (let i = 0; i < 50; i++) {
        const floor = 1 + Math.floor(i / 6); // 每6个房间一层
        const roomNumber = floor * 100 + (101 + (i % 6)); // 房间号如：201、202...

        rooms.push({
            roomNumber,
            decorationType: faker.helpers.arrayElement(['毛坯', '精装']),
            area: faker.number.int({ min: 70, max: 300 }),
            unitPrice: faker.number.int({ min: 1, max: 3 }),
            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        });
    }

    return rooms;
}

export function generateBillList(pageSize: number) {
    return Array.from({ length: pageSize }).map(() => ({
        accountNo: faker.string.numeric(6),
        status: faker.helpers.arrayElement(['1', '2']),
        roomNo: faker.helpers.arrayElement([
            'A1幢寫字樓-201',
            'B1幢寫字樓-402',
            'B2幢寫字樓-701',
            'C2幢寫字樓-1601',
        ]),
        carNo: faker.helpers.arrayElement(['B109', 'C227', 'C106', 'D158']),
        tel: faker.phone.number(),
        costName1: faker.helpers.arrayElement([1278.0, 2633.0, 3698.0]),
        costName2: '200元/月',
        costName3: faker.helpers.arrayElement(['25800/年', '19800/年']),
        startDate: '2023-01-01',
        endDate: '2024-01-01',
        preferential: 0.0,
        money: 26000.0,
        pay: faker.helpers.arrayElement(['微信', '支付寶', '現金', '銀行卡轉賬']),
    }));
}

const contractTypes = ['租賃合同', '自定義合同', '購買合同'];
const contractNames = ['房屋租賃合同通用模版', '車位租賃合同通用模版', '商業房產買賣合同'];
const startDates = ['2023-01-01', '2023-03-05', '2023-04-01'];
const endDates = ['2024-01-01', '2024-03-05', '2024-04-01'];
const jiaList = ['萬物科技有限公司', '大魚網絡科技', '六六信息技術有限公司'];
const statuses = ['1', '2', '3'];

export function generateContracts(pageSize: number) {
    return Array.from({ length: pageSize }, () => ({
        contractNo: faker.string.numeric(6),
        type: faker.helpers.arrayElement(contractTypes),
        name: faker.helpers.arrayElement(contractNames),
        startDate: faker.helpers.arrayElement(startDates),
        endDate: faker.helpers.arrayElement(endDates),
        jia: faker.helpers.arrayElement(jiaList),
        yi: '天明物業有限公司',
        status: faker.helpers.arrayElement(statuses),
    }));
}

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
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {
                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",
            },

        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]


export const menu = {
    menuList,
    userMenuList,
    managerMenuList,
    customizeMenuList
}


export function generateAccountList() {
    return [
        {
            id: 1001,
            accountName: 'xuchao',
            auth: 'admin',
            person: '徐超',
            tel: '188888888888',
            department: '总裁办',
            menu: menu.menuList,
        },
        {
            id: 1002,
            accountName: 'user01',
            auth: 'user',
            person: '王丽丽',
            tel: '17777777777',
            department: '网推部',
            menu: menu.userMenuList,
        },
        {
            id: 1003,
            accountName: 'manager01',
            auth: 'manager',
            person: '刘伟',
            tel: '16666666666',
            department: '财务部',
            menu: menu.managerMenuList,
        },
        {
            id: 1004,
            accountName: 'user02',
            auth: 'customize',
            person: '张安定',
            tel: '15555555555',
            department: '企划部',
            menu: menu.customizeMenuList,
        },
        {
            id: 1005,
            accountName: 'laowang',
            auth: 'user',
            person: '王大大',
            tel: '14444444444',
            department: '总裁办',
            menu: menu.userMenuList,
        },
    ];
}