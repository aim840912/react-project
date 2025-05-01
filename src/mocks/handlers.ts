import { http } from 'msw';
import { faker } from '@faker-js/faker';
import { menu } from './data';


const API_BASE = import.meta.env.VITE_API_BASE || 'https://fake.api.mock';


// 假資料來源
const menuByRole = {
    admin: menu.menuList, // ← 這裡貼上你原本的 menuList 陣列內容
    manager: menu.managerMenuList,
    user: menu.userMenuList,
    customize: menu.customizeMenuList,
};

const createUser = (role: keyof typeof menuByRole) => ({
    username: role,
    token: `mocktoken123456${role}`,
    btnAuth:
        role === 'admin'
            ? ['add', 'edit', 'delete']
            : role === 'manager'
                ? ['add', 'edit']
                : ['add'],
});

const handlers = [
    http.post(`${API_BASE}/login`, async ({ request }) => {
        const { username, password } = await request.json() as { username: string; password: string };

        if (username === password && ['admin', 'manager', 'user'].includes(username)) {
            const user = createUser(username as keyof typeof menuByRole);
            sessionStorage.setItem('token', user.token);
            return new Response(JSON.stringify({ code: 200, message: '登入成功', data: user }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ code: 401, message: '帳密錯誤', data: null }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }),

    http.get(`${API_BASE}/menu`, () => {
        const token = sessionStorage.getItem('token');
        const role = token?.replace('mocktoken123456', '') as keyof typeof menuByRole;
        const data = menuByRole[role] || [];

        return new Response(JSON.stringify({ code: 200, message: '成功', data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }),

    http.post(`${API_BASE}/userList`, async ({ request }) => {
        const { pageSize = 10 } = await request.json() as { pageSize: number };
        const list = Array.from({ length: pageSize }, () => ({
            id: faker.string.numeric(6),
            name: faker.person.fullName(),
            status: faker.helpers.arrayElement(['1', '2', '3']),
            tel: faker.phone.number(),
            business: faker.company.name(),
            email: faker.internet.email(),
            creditCode: faker.string.numeric(18),
            industryNum: faker.string.numeric(15),
            organizationCode: faker.string.alphanumeric(9).toUpperCase(),
            legalPerson: faker.person.fullName(),
        }));

        return new Response(JSON.stringify({ code: 200, message: '成功', data: { list, total: 78 } }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }),

    http.post(`${API_BASE}/deleteUser`, async ({ request }) => {
        const { id } = await request.json() as { id: string };
        console.log('刪除企業', id);
        return new Response(JSON.stringify({ code: 200, message: '成功', data: '操作成功' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }),

    http.post(`${API_BASE}/roomList`, async () => {
        const rooms = Array.from({ length: 50 }, (_, i) => {
            const floor = 1 + Math.floor(i / 6);
            const roomNumber = floor * 100 + (101 + (i % 6));
            return {
                roomNumber,
                decorationType: faker.helpers.arrayElement(['毛坯', '精裝']),
                area: faker.number.int({ min: 70, max: 300 }),
                unitPrice: faker.number.int({ min: 1, max: 3 }),
                src: faker.image.urlPicsumPhotos(),
            };
        });
        return new Response(JSON.stringify({ code: 200, message: '成功', data: { rooms } }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }),

    http.post(`${API_BASE}/contractList`, async ({ request }) => {
        const { pageSize = 10 } = await request.json() as { pageSize: number };
        const list = Array.from({ length: pageSize }, () => ({
            contractNo: faker.string.numeric(6),
            type: faker.helpers.arrayElement(['租賃合同', '自定義合同', '購買合同']),
            name: faker.helpers.arrayElement(['合同 A', '合同 B', '合同 C']),
            startDate: '2023-01-01',
            endDate: '2024-01-01',
            jia: faker.company.name(),
            yi: '天明物業有限公司',
            status: faker.helpers.arrayElement(['1', '2', '3']),
        }));

        return new Response(JSON.stringify({ code: 200, message: '成功', data: { list, total: 54 } }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }),

    http.post(`${API_BASE}/equipmentList`, async ({ request }) => {
        const { pageSize = 10 } = await request.json() as { pageSize: number };
        const list = Array.from({ length: pageSize }, (_, i) => ({
            id: 1000 + i,
            name: faker.helpers.arrayElement([
                '智能供水機組', '供暖設備', '攝影機', '中央空調', '充電樁', '電梯', '路燈', '通訊機'
            ]),
            no: faker.helpers.arrayElement(['CP11', 'CP22', 'CP33']),
            person: faker.person.fullName(),
            tel: faker.phone.number(),
            time: faker.helpers.arrayElement(['20年', '15年', '5年']),
            rest: '7年',
            status: faker.helpers.arrayElement([1, 2, 3]),
            last: faker.date.recent().toISOString().split('T')[0],
            endDate: '2024-01-01',
            type: faker.helpers.arrayElement(['型號1', '型號2', '型號3']),
            from: faker.company.name(),
        }));
        return new Response(JSON.stringify({ code: 200, message: '成功', data: { list, total: 66 } }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }),

    http.post(`${API_BASE}/billList`, async ({ request }) => {
        const { pageSize = 10 } = await request.json() as { pageSize: number };
        const list = Array.from({ length: pageSize }, () => ({
            accountNo: faker.string.numeric(6),
            status: faker.helpers.arrayElement(['1', '2']),
            roomNo: faker.helpers.arrayElement([
                'A1幢寫字樓-201', 'B1幢寫字樓-402', 'B2幢寫字樓-701', 'C2幢寫字樓-1601'
            ]),
            carNo: faker.helpers.arrayElement(['B109', 'C227', 'C106', 'D158']),
            tel: faker.phone.number(),
            costName1: faker.number.float({ min: 1000, max: 4000 }),
            costName2: '200元/月',
            costName3: faker.helpers.arrayElement(['25800/年', '19800/年']),
            startDate: '2023-01-01',
            endDate: '2024-01-01',
            preferential: 0.0,
            money: 26000.0,
            pay: faker.helpers.arrayElement(['微信', '支付寶', '現金', '銀行卡轉帳']),
        }));
        return new Response(JSON.stringify({ code: 200, message: '成功', data: { list, total: 54 } }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }),

    http.post(`${API_BASE}/accountList`, () => {
        const list = ['admin', 'user', 'manager', 'customize'].map((role, i) => ({
            id: 1001 + i,
            accountName: `${role}01`,
            auth: role,
            person: faker.person.fullName(),
            tel: faker.phone.number(),
            department: faker.helpers.arrayElement(['總裁辦', '網推部', '財務部', '企劃部']),
            menu: menuByRole[role as keyof typeof menuByRole] || [],
        }));

        return new Response(JSON.stringify({ code: 200, message: '成功', data: { list, total: list.length } }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }),
];

export { handlers };