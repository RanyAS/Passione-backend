import { Router } from 'express';
import {
  createReserveController,
  getReservationByIdController,
  getStoreReservationsController,
  getMineController,
  updateStatusController,
  confirmController,
  failController,
  cancelController,
  removeController,
  completeController,
} from '../controllers/reserveController.js';

/**
 * @param {{ authMiddleware?: import('express').RequestHandler }} [options]
 */
export function createReserveRoutes(options = {}) {
  const reserveRouter = Router();
  const auth = options.authMiddleware;

  if (auth) {
    reserveRouter.use(auth);
  }

  // POST   /reservations
  reserveRouter.post('/', createReserveController);

  // GET    /reservations/me
  reserveRouter.get('/me', getMineController);

  reserveRouter.get('/store/:storeId', getStoreReservationsController);

  // GET    /reservations/:id
  reserveRouter.get('/:id', getReservationByIdController);

  // PATCH  /reservations/:id/status
  reserveRouter.patch('/:id/status', updateStatusController);

  // POST   /reservations/:id/confirm
  reserveRouter.post('/:id/confirm', confirmController);

  // POST   /reservations/:id/complete
  reserveRouter.post('/:id/complete', completeController);

  // POST   /reservations/:id/fail
  reserveRouter.post('/:id/fail', failController);

  // POST   /reservations/:id/cancel
  reserveRouter.post('/:id/cancel', cancelController);

  // DELETE /reservations/:id
  reserveRouter.delete('/:id', removeController);

  return reserveRouter;
}