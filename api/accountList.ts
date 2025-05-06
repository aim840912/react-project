import type { VercelRequest, VercelResponse } from '@vercel/node';
import { menu } from '../src/utils/fakeGenerators';

function generateAccountList(count: number) {
    return [
        {
            id: 1001,
            accountName: 'xuchao',
            auth: 'admin',
            person: '徐超',
            tel: '188888888888',
            department: '总裁办',
            menu: menu.menuList,
        },
        {
            id: 1002,
            accountName: 'user01',
            auth: 'user',
            person: '王丽丽',
            tel: '17777777777',
            department: '网推部',
            menu: menu.userMenuList,
        },
        {
            id: 1003,
            accountName: 'manager01',
            auth: 'manager',
            person: '刘伟',
            tel: '16666666666',
            department: '财务部',
            menu: menu.managerMenuList,
        },
        {
            id: 1004,
            accountName: 'user02',
            auth: 'customize',
            person: '张安定',
            tel: '15555555555',
            department: '企划部',
            menu: menu.customizeMenuList,
        },
        {
            id: 1005,
            accountName: 'laowang',
            auth: 'user',
            person: '王大大',
            tel: '14444444444',
            department: '总裁办',
            menu: menu.userMenuList,
        },
    ];
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { pageSize = 10 } = req.body || {};
    const list = generateAccountList(pageSize);

    return res.status(200).json({
        data: {
            list,
            total: 80,
        },
    });
}
