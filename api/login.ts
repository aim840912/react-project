import type { VercelRequest, VercelResponse } from '@vercel/node';

const users = {
    admin: {
        password: 'admin',
        token: 'mocktoken123456admin',
        btnAuth: ['add', 'edit', 'delete'],
    },
    manager: {
        password: 'manager',
        token: 'mocktoken123456manager',
        btnAuth: ['add', 'edit'],
    },
    user: {
        password: 'user',
        token: 'mocktoken123456user',
        btnAuth: ['add'],
    },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, password } = req.body || {};
    const user = users[username as keyof typeof users];

    if (user && user.password === password) {
        return res.status(200).json({
            data: {
                username,
                token: user.token,
                btnAuth: user.btnAuth,
            },
        });
    }

    return res.status(401).json({ message: '用戶名或密碼有誤', data: '' });
}
