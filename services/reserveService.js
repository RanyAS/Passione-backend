import supabase from "../database/supabase.js";

const RESERVATION_SELECT = `
  id,
  user_id,
  pin_id,
  status,
  party_size,
  reserved_at,
  note,
  created_at,
  updated_at,
  users (
    id,
    username
  ),
  store_pin!inner (
    id,
    store_id,
    time,
    empty_seat,
    description,
    starts_at,
    ends_at,
    is_active,
    stores (
      id,
      sname,
      address,
      latitude,
      longitude
    )
  )
`;

function mapReservationRow(row) {
  const pin = row.store_pin;
  const store = pin?.stores;
  const user = row.users;

  return {
    id: row.id,
    userId: row.user_id,
    username: user?.username ?? "ユーザ",
    pinId: row.pin_id,
    status: row.status,
    partySize: row.party_size,
    reservedAt: row.reserved_at,
    note: row.note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    pin: pin
      ? {
          id: pin.id,
          storeId: pin.store_id,
          time: pin.time,
          emptySeat: pin.empty_seat,
          description: pin.description,
          startsAt: pin.starts_at,
          endsAt: pin.ends_at,
          isActive: pin.is_active,
          store: store
            ? {
                id: store.id,
                name: store.sname,
                address: store.address,
                latitude: store.latitude,
                longitude: store.longitude,
              }
            : null,
        }
      : null,
  };
}

function buildUpdatePayload(patch) {
  const payload = {};
  if (patch.status !== undefined) payload.status = patch.status;
  if (patch.partySize !== undefined) payload.party_size = patch.partySize;
  if (patch.reservedAt !== undefined) payload.reserved_at = patch.reservedAt;
  if (patch.note !== undefined) payload.note = patch.note;
  payload.updated_at = new Date().toISOString();
  return payload;
}

export async function createReservation({ userId, pinId, partySize = 1, reservedAt = null, note = null }) {
  if (!userId) throw new Error('userId is required');
  if (!pinId) throw new Error('pinId is required');

  const insertPayload = {
    user_id: userId,
    pin_id: pinId,
    status: 'pending',
    party_size: partySize,
    reserved_at: reservedAt,
    note,
  };

  const { data, error } = await supabase
    .from('reservation')
    .insert(insertPayload)
    .select(RESERVATION_SELECT)
    .single();

  if (error) throw error;
  return mapReservationRow(data);
}

export async function getReservationsByStoreId(storeId) {
  const { data, error } = await supabase
    .from('reservation')
    .select(RESERVATION_SELECT)
    .eq('store_pin.store_id', storeId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map(mapReservationRow);
}

export async function getReservationById(reservationId) {
  const { data, error } = await supabase
    .from('reservation')
    .select(RESERVATION_SELECT)
    .eq('id', reservationId)
    .single();

  if (error) throw error;
  return mapReservationRow(data);
}

export async function getReservationsByUserId(userId) {
  const { data, error } = await supabase
    .from('reservation')
    .select(RESERVATION_SELECT)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapReservationRow);
}

export async function updateReservation(reservationId, patch) {
  const updatePayload = buildUpdatePayload(patch);

  const { data, error } = await supabase
    .from('reservation')
    .update(updatePayload)
    .eq('id', reservationId)
    .select(RESERVATION_SELECT)
    .single();

  if (error) throw error;
  return mapReservationRow(data);
}

export async function confirmReservation(reservationId) {
  const { data, error } = await supabase.rpc(
    'confirm_reservation',
    {
      p_reservation_id: reservationId,
    }
  );

  if (error) throw error;

  return mapReservationRow(data);
}

export async function failReservation(reservationId, note = null) {
  return updateReservation(reservationId, { status: 'failed', note });
}

export async function cancelReservation(reservationId, note = null) {
  return updateReservation(reservationId, { status: 'cancelled', note });
}

export async function completeReservation(reservationId) {
  const reservation = await getReservationById(reservationId);

  const updatedReservation = await updateReservation(reservationId, {
    status: 'completed',
  });

  await supabase
    .from('user_history')
    .insert({
      user_id: reservation.userId,
      store_id: reservation.pin.storeId,
      reservation_id: reservation.id,
    });

  return updatedReservation;
}

export async function deleteReservation(reservationId) {
  const { error } = await supabase.from('reservation').delete().eq('id', reservationId);
  if (error) throw error;
  return true;
}