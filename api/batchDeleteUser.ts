export default function handler(
    req: { method: string; body: { keys: string[] } },
    res: { status: Function; json: (body) => void; end: () => void }
) {
    if (req.method === "POST") {
        return res
            .status(200)
            .json({ message: `已刪除 ${req.body.keys.length} 筆使用者資料` });
    }

    res.status(405).end();
}
