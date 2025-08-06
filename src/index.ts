import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as agentRouter } from './routes/agentRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

app.use('/', agentRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AI Agent Server is running' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export for potential serverless environments
export default app;