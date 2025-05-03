import type { VercelRequest, VercelResponse } from '@vercel/node';
import { faker } from '@faker-js/faker';

function generateUserList(count: number) {
    return Array.from({ length: count }, () => ({
        key: faker.string.uuid(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        company: faker.company.name(),
        address: faker.location.city(),
        age: faker.number.int({ min: 18, max: 65 }),
        createdAt: faker.date.past().toISOString(),
    }));
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { pageSize = 10 } = req.body || {};
    const list = generateUserList(pageSize);

    return res.status(200).json({
        data: {
            list,
            total: 50,
        },
    });
}
