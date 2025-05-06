import type { VercelRequest, VercelResponse } from '@vercel/node';
import { faker } from '@faker-js/faker';

function generateBillList(pageSize: number) {
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

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { pageSize = 10 } = req.body || {};
    const list = generateBillList(pageSize);

    return res.status(200).json({
        data: {
            list,
            total: 80,
        },
    });
}
