// File: /api/equipmentList.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { faker } from '@faker-js/faker';

function generateEquipmentList(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: faker.string.uuid(),
        name: `設備 ${i + 1}`,
        category: faker.helpers.arrayElement(['冷氣', '冰箱', '電視', '洗衣機', '熱水器']),
        brand: faker.company.name(),
        model: faker.commerce.productName(),
        purchaseDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
        status: faker.helpers.arrayElement(['正常', '維修中', '報廢']),
    }));
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { pageSize = 10 } = req.body || {};
    const list = generateEquipmentList(pageSize);

    return res.status(200).json({
        data: {
            list,
            total: 200,
        },
    });
}
