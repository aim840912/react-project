import type { VercelRequest, VercelResponse } from '@vercel/node';
import { faker } from '@faker-js/faker';

function generateUserList(count: number) {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        status: faker.helpers.arrayElement(['1', '2', '3']),
        tel: faker.phone.number(),
        business: faker.helpers.arrayElement(['製造業', '互聯網', '新媒體', '美業', '新能源', '物流', '電商']),
        email: faker.internet.email(),
        creditCode: faker.string.numeric(18),
        industryNum: faker.string.numeric(15),
        organizationCode: faker.string.alphanumeric(9).toUpperCase(),
        legalPerson: faker.person.fullName()
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
