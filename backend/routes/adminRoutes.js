import express from 'express';
import { getUsers, updateUserRole, getReservations, updateReservationStatus } from '../controllers/adminController.js';
import { getDashboardAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/analytics', getDashboardAnalytics);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.get('/reservations', getReservations);
router.put('/reservations/:id/status', updateReservationStatus);

export default router;
