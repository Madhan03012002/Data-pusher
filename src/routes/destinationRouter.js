import express from 'express';
import {
  createDestination,
  getAccountDestinations,
  getDestination,
  updateDestination,
  deleteDestination
} from '../contollers/destinationController.js';

const router = express.Router({ mergeParams: true })
router.use((req, res, next) => {
    console.log('Params:', req.params);
    console.log('URL:', req.originalUrl);
    next();
  });
router.post('/', createDestination);
router.get('/', getAccountDestinations);
router.get('/:id', getDestination);
router.put('/:id', updateDestination);
router.delete('/:id', deleteDestination);

export default router;