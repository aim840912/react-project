import type { VercelRequest, VercelResponse } from '@vercel/node';
import { faker } from '@faker-js/faker';

function generateEquipmentList(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: faker.string.uuid(),
        no: faker.string.numeric(6),
        name: `設備 ${i + 1}`,
        person: faker.person.fullName(),
        tel: faker.phone.number(),
        time: faker.date.past({ years: 5 }).toISOString().split('T')[0],
        rest: faker.number.int({ min: 1, max: 10 }),
        status: faker.helpers.arrayElement(['正常', '維修中', '報廢']),
        last: faker.date.past({ years: 5 }).toISOString().split('T')[0],
        type: faker.helpers.arrayElement(['冷氣', '冰箱', '電視', '洗衣機', '熱水器']),
        from: faker.helpers.arrayElement(['自有', '租賃']),
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
