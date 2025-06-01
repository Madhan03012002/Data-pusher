import express from 'express';
import accountRoutes from './accountRouter.js';
import destinationRoutes from './destinationRouter.js';
import webhookRoutes from './webhookRouter.js';

const router = express.Router()

router.use('/accounts', accountRoutes);
router.use('/accounts/destinations/:account_id', destinationRoutes);
router.use('/', webhookRoutes);

export default router;