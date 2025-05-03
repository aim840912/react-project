import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    return res.status(200).json({
        data: [
            { name: '煤', data: [120, 132, 101, 134, 90, 230, 210] },
            { name: '氣', data: [220, 182, 191, 234, 290, 330, 310] },
            { name: '油', data: [150, 232, 201, 154, 190, 330, 410] },
            { name: '電', data: [320, 332, 301, 334, 390, 330, 320] },
            { name: '熱', data: [820, 932, 901, 934, 1290, 1330, 1320] }
        ]
    });
}
