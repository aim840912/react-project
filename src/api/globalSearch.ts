import { generateUserList, generateContracts, generateEquipmentList } from '../mocks/fakeGenerators';
import { http, HttpResponse, type HttpHandler, type StrictResponse } from 'msw';
import type { SearchResult } from '../features/dashboard/api/dashboardApi';

const commandActions: SearchResult[] = [
    { type: 'action', id: 'cmd-toggle-theme', name: '🎨 切換深色/淺色模式', actionType: 'TOGGLE_THEME' },
    { type: 'action', id: 'cmd-logout', name: '🚪 登出系統', actionType: 'LOGOUT' },
];

// 導出符合 MSW v2 簽名的處理函式
const globalSearchHandler: HttpHandler = http.post('/api/globalSearch', async ({ request }) => {
    const { keyword } = (await request.json()) as { keyword?: string };

    if (!keyword) {
        return HttpResponse.json({ data: [] });
    }

    // 模擬資料庫查詢
    const allUsers = generateUserList(20);
    const allContracts = generateContracts(20);
    const allEquipment = generateEquipmentList(20);

    const lowerCaseKeyword = keyword.toLowerCase();

    // 篩選使用者
    const userResults: SearchResult[] = allUsers
        .filter(user => user.name.toLowerCase().includes(lowerCaseKeyword))
        .map(user => ({
            type: 'user',
            id: user.id,
            name: `租戶: ${user.name}`,
            url: `/users/list?highlight=${user.id}`,
        }));

    // 篩選合約
    const contractResults: SearchResult[] = allContracts
        .filter(contract => contract.name.toLowerCase().includes(lowerCaseKeyword) || contract.contractNo.includes(lowerCaseKeyword))
        .map(contract => ({
            type: 'contract',
            id: contract.contractNo,
            name: `合約: ${contract.name}`,
            url: `/finance/surrender?contractNo=${contract.contractNo}`,
        }));

    // 篩選設備
    const equipmentResults: SearchResult[] = allEquipment
        .filter(equipment => equipment.name.toLowerCase().includes(lowerCaseKeyword))
        .map(equipment => ({
            type: 'equipment',
            id: equipment.id,
            name: `設備: ${equipment.name}`,
            url: `/equipment?highlight=${equipment.id}`,
        }));

    // 篩選操作指令
    const actionResults: SearchResult[] = commandActions
        .filter(action => action.name.toLowerCase().includes(lowerCaseKeyword));


    const results = [...actionResults, ...userResults, ...contractResults, ...equipmentResults];

    return HttpResponse.json({ data: results });
});

export default globalSearchHandler;