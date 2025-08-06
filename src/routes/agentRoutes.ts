import {Router} from 'express';
import { handleAgentMessage } from '../service/agent.js';

export const router = Router();

router.post('/agent/message', async (req,res) => {
  const {session_id, message} = req.body;
  if(!session_id) {
    return res.status(400).json({error:'Missing session_id'});
  }
  if(!message) {
    return res.status(400).json({error: 'Missing message'});
  }
  try {
    const reply = await handleAgentMessage(session_id, message);
    res.status(200).send({reply});
  } catch (err) {
    console.error('Agent message error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown server error';
    return res.status(500).json({reply: `Error: ${errorMessage}`});
  }
});
