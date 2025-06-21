import type { VercelRequest, VercelResponse } from '@vercel/node';
// import { menu } from '../src/utils/fakeGenerators';
import { menuList, userMenuList, managerMenuList } from './menu';

function generateAccountList() {
    return [
        {
            id: 1001,
            accountName: 'xuchao',
            auth: 'admin',
            person: '徐超',
            tel: '188888888888',
            department: '总裁办',
            menu: menuList,
        },
        {
            id: 1002,
            accountName: 'user01',
            auth: 'user',
            person: '王丽丽',
            tel: '17777777777',
            department: '网推部',
            menu: userMenuList,
        },
        {
            id: 1003,
            accountName: 'manager01',
            auth: 'manager',
            person: '刘伟',
            tel: '16666666666',
            department: '财务部',
            menu: managerMenuList,
        },
        {
            id: 1004,
            accountName: 'user02',
            auth: 'customize',
            person: '张安定',
            tel: '15555555555',
            department: '企划部',
            menu: managerMenuList,
        },
        {
            id: 1005,
            accountName: 'laowang',
            auth: 'user',
            person: '王大大',
            tel: '14444444444',
            department: '总裁办',
            menu: userMenuList,
        },
    ];
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }


    return res.status(200).json({
        data: {
            list: generateAccountList(),
            total: 80,
        },
    });
}
