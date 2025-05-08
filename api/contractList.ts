import type { VercelRequest, VercelResponse } from '@vercel/node';
import { faker } from '@faker-js/faker';

const contractTypes = ['租賃合同', '自定義合同', '購買合同'];
const contractNames = ['房屋租賃合同通用模版', '車位租賃合同通用模版', '商業房產買賣合同'];
const startDates = ['2023-01-01', '2023-03-05', '2023-04-01'];
const endDates = ['2024-01-01', '2024-03-05', '2024-04-01'];
const jiaList = ['萬物科技有限公司', '大魚網絡科技', '六六信息技術有限公司'];
const statuses = ['1', '2', '3'];

function generateContracts(count: number) {
    return Array.from({ length: count }, (_, i) => ({
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

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { pageSize = 10 } = req.body || {};
    const list = generateContracts(pageSize);

    return res.status(200).json({
        data: {
            list,
            total: 80,
        },
    });
}
