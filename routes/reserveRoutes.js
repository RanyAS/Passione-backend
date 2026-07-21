import { Router } from 'express';
import {
  createReserveController,
  getReservationByIdController,
  getMineController,
  updateStatusController,
  confirmController,
  failController,
  cancelController,
  removeController,
} from '../controllers/reserveController.js';

/**
 * @param {{ authMiddleware?: import('express').RequestHandler }} [options]
 */
export function createReserveRoutes(options = {}) {
  const router = Router();
  const auth = options.authMiddleware;

  if (auth) {
    router.use(auth);
  }

  // POST   /reservations
  router.post('/', createReserveController);

  // GET    /reservations/me
  router.get('/me', getMineController);

  // GET    /reservations/:id
  router.get('/:id', getReservationByIdController);

  // PATCH  /reservations/:id/status
  router.patch('/:id/status', updateStatusController);

  // POST   /reservations/:id/confirm
  router.post('/:id/confirm', confirmController);

  // POST   /reservations/:id/fail
  router.post('/:id/fail', failController);

  // POST   /reservations/:id/cancel
  router.post('/:id/cancel', cancelController);

  // DELETE /reservations/:id
  router.delete('/:id', removeController);

  return router;
}
