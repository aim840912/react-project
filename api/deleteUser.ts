export default function handler(req: { body; method: string }, res: { status: Function; json: (body) => void; end: () => void }) {
    if (req.method === 'POST') {
        const { key } = req.body;
        return res.status(200).json({ message: `使用者 ${key} 已刪除` });
    }
    res.status(405).end();
}
