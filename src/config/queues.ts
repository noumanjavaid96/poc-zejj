// This file will contain the configuration for our BullMQ job queues.
// We will define different queues for different types of jobs (e.g., patient sync, invoice sync).

import { Queue } from 'bullmq';

// The default connection options for Redis.
// In a real application, these would come from environment variables.
const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};

// A queue for handling patient data synchronization.
export const patientSyncQueue = new Queue('patient-sync', {
  connection: redisConnection,
});

// A queue for handling invoice data synchronization.
export const invoiceSyncQueue = new Queue('invoice-sync', {
  connection: redisConnection,
});

console.log('BullMQ queues configured.');