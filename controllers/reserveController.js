import {
  createReservation,
  getReservationById,
  getReservationsByUserId,
  getReservationsByStoreId,
  updateReservation,
  confirmReservation,
  failReservation,
  cancelReservation,
  deleteReservation,
  completeReservation,
} from '../services/reserveService.js';

export async function createReserveController(req, res) {
  try {
    const userId = req.user?.id ?? req.body.userId;
    const { pinId, partySize, reservedAt, note } = req.body;

    const reservation = await createReservation({
      userId,
      pinId,
      partySize,
      reservedAt,
      note,
    });

    return res.status(201).json({ data: reservation });
  } catch (error) {
    return res.status(400).json({
      error: error.message ?? 'Failed to create reservation',
    });
  }
}

export async function getStoreReservationsController(req, res) {
  try {
    const { storeId } = req.params;
        console.log("🏪 REQUESTED STORE ID:", storeId);

    if (!storeId) {
      return res.status(400).json({
        error: 'storeId is required',
      });
    }

    const reservations = await getReservationsByStoreId(storeId);


    console.log("📦 STORE RESERVATIONS:", reservations);

    return res.status(200).json({
      data: reservations,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message ?? 'Failed to fetch store reservations',
    });
  }
}

export async function getReservationByIdController(req, res) {
  try {
    const reservation = await getReservationById(req.params.id);
    return res.status(200).json({ data: reservation });
  } catch (error) {
    return res.status(404).json({
      error: error.message ?? 'Reservation not found',
    });
  }
}

export async function getMineController(req, res) {
  try {
    const userId = req.user?.id ?? req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const reservations = await getReservationsByUserId(userId);
    return res.status(200).json({ data: reservations });
  } catch (error) {
    return res.status(400).json({
      error: error.message ?? 'Failed to fetch reservations',
    });
  }
}

export async function updateStatusController(req, res) {
  try {
    const { status, note } = req.body;
    const reservation = await updateReservation(req.params.id, {
      status,
      note,
    });
    return res.status(200).json({ data: reservation });
  } catch (error) {
    return res.status(400).json({
      error: error.message ?? 'Failed to update reservation',
    });
  }
}

export async function confirmController(req, res) {
  try {
    const reservation = await confirmReservation(req.params.id);
    return res.status(200).json({ data: reservation });
  } catch (error) {
    return res.status(400).json({
      error: error.message ?? 'Failed to confirm reservation',
    });
  }
}

export async function completeController(req, res) {
  try {
    const reservation = await completeReservation(req.params.id);
    return res.status(200).json({ data: reservation });
  } catch (error) {
    return res.status(400).json({
      error: error.message ?? 'Failed to complete reservation',
    });
  }
}

export async function failController(req, res) {
  try {
    const reservation = await failReservation(
      req.params.id,
      req.body?.note ?? null
    );
    return res.status(200).json({ data: reservation });
  } catch (error) {
    return res.status(400).json({
      error: error.message ?? 'Failed to mark reservation as failed',
    });
  }
}

export async function cancelController(req, res) {
  try {
    const reservation = await cancelReservation(
      req.params.id,
      req.body?.note ?? null
    );
    return res.status(200).json({ data: reservation });
  } catch (error) {
    return res.status(400).json({
      error: error.message ?? 'Failed to cancel reservation',
    });
  }
}

export async function removeController(req, res) {
  try {
    await deleteReservation(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      error: error.message ?? 'Failed to delete reservation',
    });
  }
}
