import express from 'express';
import { handleIncomingData } from '../contollers/webhook.js';

const router = express.Router();

router.post('/server/incoming_data', handleIncomingData);

export default router;