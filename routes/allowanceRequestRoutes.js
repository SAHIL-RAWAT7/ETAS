import express from 'express';
import {
  createRequest,
  getRequests,
  updateRequestStatus,
  deleteRequest,
  getRequestsByUser
} from '../controllers/allowanceRequestController.js';

const router = express.Router();

router.post('/', createRequest);
router.get('/', getRequests);
router.get('/user/:userId', getRequestsByUser);
router.patch('/:id/status', updateRequestStatus);
router.delete('/:id', deleteRequest);

export default router;