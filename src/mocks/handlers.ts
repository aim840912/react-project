import { http, HttpResponse } from 'msw';
import { menu, generateUserList, generateContracts, generateRoomList, generateBillList, generateAccountList, generateEquipmentList } from './fakeGenerators';
import globalSearchHandler from '../api/globalSearch';

export const handlers = [
    http.post('/api/login', async ({ request }) => {
        const { username, password } = await request.json() as {
            username: string;
            password: string;
        };

        if (username === 'admin' && password === 'admin') {
            return HttpResponse.json({
                code: 200,
                message: '登錄成功',
                data: {
                    username: 'admin',
                    token: 'mocktoken123456admin',
                    btnAuth: ['add', 'edit', 'delete'],
                }
            });
        }

        if (username === 'manager' && password === 'manager') {
            return HttpResponse.json({
                code: 200,
                message: '登錄成功',
                data: {
                    username: 'manager',
                    token: 'mocktoken123456manager',
                    btnAuth: ['add', 'edit'],
                }
            });
        }

        if (username === 'user' && password === 'user') {
            return HttpResponse.json({
                code: 200,
                message: '登錄成功',
                data: {
                    username: 'user',
                    token: 'mocktoken123456user',
                    btnAuth: ['add'],
                }
            });
        }

        return HttpResponse.json({
            code: 401,
            message: '用戶名或密碼有誤',
            data: ''
        });
    }),

    http.get('/api/menu', ({ request }) => {
        // const token = sessionStorage.getItem("token");
        const authHeader = request.headers.get('Authorization');

        const token = authHeader?.replace('Bearer ', '');

        if (token === 'mocktoken123456admin') {
            return HttpResponse.json({
                code: 200,
                message: '請求成功',
                data: menu.menuList
            });
        }

        if (token === 'mocktoken123456manager') {
            return HttpResponse.json({
                code: 200,
                message: '請求成功',
                data: menu.managerMenuList
            });
        }

        if (token === 'mocktoken123456user') {
            return HttpResponse.json({
                code: 200,
                message: '請求成功',
                data: menu.userMenuList
            });
        }

        return HttpResponse.json({
            code: 200,
            message: '失敗',
            data: []
        });
    }),
    http.post('/api/userList', async ({ request }) => {
        const body = await request.json() as { pageSize?: number };
        const pageSize = body.pageSize ?? 10;

        return HttpResponse.json({
            code: 200,
            message: '獲取成功',
            data: {
                list: generateUserList(pageSize),
                total: 78
            }
        });
    }),
    http.post('/api/deleteUser', async ({ request }) => {
        const body = await request.json() as { id?: string };
        const { id } = body;
        if (!id) {
            return HttpResponse.json(
                { message: '缺少使用者 ID' },
                { status: 400 } // 設定 HTTP 狀態碼為 400
            );
        }
        return HttpResponse.json({
            message: `使用者 ID: ${id} 已成功刪除`,
        });
    }),
    http.post('/api/batchDeleteUser', async ({ request }) => {
        const body = await request.json() as { ids?: React.Key[] };
        const { ids } = body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return HttpResponse.json(
                { message: '缺少需要刪除的 ID 列表' },
                { status: 400 } // 回傳 400 Bad Request
            );
        }
        return HttpResponse.json({
            message: `成功刪除了 ${ids.length} 筆使用者資料`,
        });
    }),
    http.post('/api/roomList', async ({ }) => {
        return HttpResponse.json({
            code: 200,
            message: '獲取成功',
            data: {
                rooms: generateRoomList()
            }
        });
    }),
    http.get('/api/energyData', () => {
        return HttpResponse.json({
            code: 200,
            message: '請求成功',
            data: [
                { name: '煤', data: [120, 132, 101, 134, 90, 230, 210] },
                { name: '氣', data: [220, 182, 191, 234, 290, 330, 310] },
                { name: '油', data: [150, 232, 201, 154, 190, 330, 410] },
                { name: '電', data: [320, 332, 301, 334, 390, 330, 320] },
                { name: '熱', data: [820, 932, 901, 934, 1290, 1330, 1320] }
            ]
        });
    }),
    http.post('/api/contractList', async ({ request }) => {
        const body = await request.json() as { pageSize?: number };
        const pageSize = body.pageSize ?? 10;

        return HttpResponse.json({
            code: 200,
            message: '獲取成功',
            data: {
                list: generateContracts(pageSize),
                total: 80
            }
        });
    }),
    http.post('/api/billList', async ({ request }) => {
        const body = await request.json() as { page?: number; pageSize?: number; companyName?: string; contact?: string; phone?: string };
        const { pageSize = 10 } = body;

        return HttpResponse.json({
            code: 200,
            message: '成功',
            data: {
                list: generateBillList(pageSize),
                total: 80
            },
        });
    }),
    http.post('/api/accountList', async ({ }) => {
        return HttpResponse.json({
            code: 200,
            message: '成功',
            data: {
                list: generateAccountList(),
                total: 80
            },
        });
    }),
    http.post('/api/equipmentList', async ({ request }) => {
        const body = await request.json() as { page?: number; pageSize?: number; };
        const { pageSize = 10 } = body;
        return HttpResponse.json({
            code: 200,
            message: '成功',
            data: {
                list: generateEquipmentList(pageSize),
                total: 80
            },
        });
    }),
    globalSearchHandler,

];
