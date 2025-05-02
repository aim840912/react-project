// File: /api/roomList.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { faker } from '@faker-js/faker';

function generateRoomList(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: faker.string.uuid(),
        name: `房間 ${i + 1}`,
        type: faker.helpers.arrayElement(['單人房', '雙人房', '家庭房']),
        status: faker.helpers.arrayElement(['空房', '已入住', '維修中']),
        floor: faker.number.int({ min: 1, max: 12 }),
        area: faker.number.float({ min: 15, max: 45 }),
        price: faker.number.int({ min: 8000, max: 25000 }),
    }));
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { pageSize = 10 } = req.body || {};
    const list = generateRoomList(pageSize);

    return res.status(200).json({
        data: {
            list,
            total: 100,
        },
    });
}
