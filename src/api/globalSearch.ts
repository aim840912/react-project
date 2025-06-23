import { generateUserList, generateContracts, generateEquipmentList } from '../mocks/fakeGenerators';
import { http, HttpResponse, type HttpHandler, type StrictResponse } from 'msw';
import type { VercelRequest, VercelResponse } from '@vercel/node'; // 雖然不再直接使用，但保留類型參考// 修正路徑

// 定義回傳的資料類型
interface SearchResult {
    type: 'user' | 'contract' | 'equipment';
    id: string;
    name: string;
    url: string;
}

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

    const results = [...userResults, ...contractResults, ...equipmentResults];

    return HttpResponse.json({ data: results });
});

export default globalSearchHandler;