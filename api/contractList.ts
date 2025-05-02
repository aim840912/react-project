// File: /api/contractList.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { faker } from '@faker-js/faker';

function generateContracts(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: faker.string.uuid(),
        name: `合約 ${i + 1}`,
        amount: faker.number.int({ min: 1000, max: 50000 }),
        startDate: faker.date.past({ years: 2 }).toISOString().split('T')[0],
        endDate: faker.date.future({ years: 1 }).toISOString().split('T')[0],
        status: faker.helpers.arrayElement(['有效', '已終止', '待簽署']),
        contactPerson: faker.person.fullName(),
        phone: faker.phone.number(),
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
