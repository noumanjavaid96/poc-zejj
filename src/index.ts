import express, { Request, Response } from 'express';
import helmet from 'helmet';
import path from 'path';
import { SyncService } from './services/sync.service';
import { VapiService } from './services/vapi.service';

const app = express();
const port = process.env.PORT || 3000;

// --- Middleware ---
app.use(helmet()); // Basic security headers
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// --- Static Files ---
// Serve the 'public' directory for our UI
app.use(express.static(path.join(__dirname, '../public')));

// --- API Endpoints ---
app.post('/api/sync', async (req: Request, res: Response) => {
  try {
    const syncService = new SyncService();
    // In a real app, the patient ID might come from the request body
    const log = await syncService.runSync('patient-123');
    res.status(200).json({ log });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ log: ['An unexpected error occurred on the server.'] });
  }
});

app.post('/api/vapi-webhook', async (req: Request, res: Response) => {
  try {
    const vapiService = new VapiService();
    await vapiService.handleWebhook(req.body);
    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Vapi Webhook Error:', error);
    res.status(500).send('Error processing webhook');
  }
});

// --- Server Start ---
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});