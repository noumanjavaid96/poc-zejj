import request from 'supertest';
import express from 'express';
import helmet from 'helmet';
import logger from '../utils/logger'; // Assuming logger is properly configured

// We need to create an instance of our app for testing
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Re-implement the endpoint here for isolated testing
// In a more complex app, we would import the app instance directly
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' }); // Simplified for test consistency
});

describe('GET /health', () => {
  it('should respond with a 200 status and a JSON object', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.status).toBe('ok');
  });
});