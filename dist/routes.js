import { Router } from 'express';
export const router = Router();
router.post('/agent/message', async (req, res) => {
    const { session_id, message } = req.body;
    if (!session_id) {
        return res.status(400).json({ error: 'Missing session_id' });
    }
    if (!message) {
        return res.status(400).json({ error: 'Missing message' });
    }
    try {
        // TODO: Handle Agent Message
        const reply = { reply: "hi, how are you?" };
        return res.status(200).json(reply);
    }
    catch (err) {
        console.error('Agent message error:', err);
        return res.status(500).json({ reply: "server error" });
    }
});
