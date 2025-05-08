import type { VercelRequest, VercelResponse } from '@vercel/node';
import { faker } from '@faker-js/faker';

function generateRoomList() {
    const rooms: {
        roomNumber: number;
        decorationType: '毛坯' | '精装';
        area: number;
        unitPrice: number;
        src: string;
    }[] = [];

    for (let i = 0; i < 50; i++) {
        const floor = 1 + Math.floor(i / 6); // 每6个房间一层
        const roomNumber = floor * 100 + (101 + (i % 6)); // 房间号如：201、202...

        rooms.push({
            roomNumber,
            decorationType: faker.helpers.arrayElement(['毛坯', '精装']),
            area: faker.number.int({ min: 70, max: 300 }),
            unitPrice: faker.number.int({ min: 1, max: 3 }),
            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        });
    }

    return rooms;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }


    const list = generateRoomList();

    return res.status(200).json({
        data: {
            list,
            total: 100,
        },
    });
}
