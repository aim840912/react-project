import type { DeleteUserRequest, ApiResponse } from '../src/types/api';

export default function handler(req: { body: DeleteUserRequest; method: string }, res: { status: Function; json: (body: ApiResponse) => void; end: () => void }) {
    if (req.method === 'POST') {
        const { key } = req.body;
        return res.status(200).json({ message: `使用者 ${key} 已刪除` });
    }
    res.status(405).end();
}
