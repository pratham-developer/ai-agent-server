import { Router } from 'express';
import { embedText } from '../utils/embed.js';
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
        const vector = await embedText(message);
        const reply = { reply: vector };
        return res.status(200).json(reply);
    }
    catch (err) {
        console.error('Agent message error:', err);
        return res.status(500).json({ reply: "server error" });
    }
});
