import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as agentRouter } from './routes.js';

dotenv.config();

const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());

app.use('/', agentRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});