import express, { Request, Response } from 'express';
import helmet from 'helmet';
import logger from './utils/logger';

const app = express();
const port = process.env.PORT || 3000;

// Apply security middleware
app.use(helmet());

// Apply JSON and URL-encoded body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the secure server!');
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});