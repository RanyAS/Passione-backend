import supabase from "../database/supabase.js";

const STORE_PIN_SELECT = `
  id,
  store_id,
  time,
  empty_seat,
  rule,
  description,
  created_at,
  starts_at,
  ends_at,
  is_active,
  stores!inner (
    id,
    sname,
    address,
    tel,
    open_time,
    star,
    site,
    image_path,
    genre_id,
    latitude,
    longitude,
    created_at
  )
`;

function mapStorePinRow(row) {
  const store = Array.isArray(row.stores) ? row.stores[0] : row.stores;

  return {
    id: row.id,
    storeId: row.store_id,
    time: row.time,
    emptySeat: row.empty_seat,
    rule: row.rule,
    description: row.description,
    createdAt: row.created_at,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    isActive: row.is_active,
    store: {
      id: store.id,
      name: store.sname,
      address: store.address,
      tel: store.tel,
      openTime: store.open_time,
      star: store.star,
      site: store.site,
      imagePath: store.image_path,
      genreId: store.genre_id,
      latitude: store.latitude,
      longitude: store.longitude,
      createdAt: store.created_at,
    },
    coordinates: {
      latitude: Number(store.latitude),
      longitude: Number(store.longitude),
    },
  };
}

function buildUpdatePayload(patch) {
  const payload = {};
  if (patch.storeId !== undefined) payload.store_id = patch.storeId;
  if (patch.time !== undefined) payload.time = patch.time;
  if (patch.emptySeat !== undefined) payload.empty_seat = patch.emptySeat;
  if (patch.rule !== undefined) payload.rule = patch.rule;
  if (patch.description !== undefined) payload.description = patch.description;
  if (patch.startsAt !== undefined) payload.starts_at = patch.startsAt;
  if (patch.endsAt !== undefined) payload.ends_at = patch.endsAt;
  if (patch.isActive !== undefined) payload.is_active = patch.isActive;
  return payload;
}

//全てのピンを取得する
export async function getAllstorePin(storeId) {
  let query = supabase
    .from("store_pin")
    .select(STORE_PIN_SELECT)
    .not("stores.latitude", "is", null)
    .not("stores.longitude", "is", null)
    .order("created_at", { ascending: false });

  if (storeId) query = query.eq("store_id", storeId);

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []).map(mapStorePinRow);
}

// Pins アクティブなピンを取得する（store_idと現在時刻を指定）
export async function getActiveStorePins(storeId, nowIso = new Date().toISOString()) {
  const allPins = await getAllstorePin(storeId);

  console.log("🔥 NOW:", nowIso);
  console.log("🔥 ALL PINS BEFORE ACTIVE FILTER:", allPins);

  return allPins.filter((pin) => {
    const afterStart = !pin.startsAt || pin.startsAt <= nowIso;
    const beforeEnd = !pin.endsAt || pin.endsAt >= nowIso;
    return (
      pin.isActive &&
      pin.emptySeat > 0 &&
      afterStart &&
      beforeEnd
    );
  });
}
// 特定のピンを取得する
export async function getstorePin(pinId) {
  const { data, error } = await supabase
    .from("store_pin")
    .select(STORE_PIN_SELECT)
    .eq("id", pinId)
    .single();

  if (error) throw error;
  return mapStorePinRow(data);
}

export async function createStorePin(payload) {
  const start = payload.startsAt
    ? new Date(payload.startsAt)
    : null;

  const end = payload.endsAt
    ? new Date(payload.endsAt)
    : null;

  const time =
    start && end
      ? Math.floor((end.getTime() - start.getTime()) / 60000)
      : null;

  const insertPayload = {
    store_id: payload.storeId,
    time,
    empty_seat: payload.emptySeat,
    rule: payload.rule ?? null,
    description: payload.description ?? null,
    starts_at: payload.startsAt ?? null,
    ends_at: payload.endsAt ?? null,
    is_active: payload.isActive ?? true,
  };

  const { data, error } = await supabase
    .from("store_pin")
    .insert(insertPayload)
    .select(STORE_PIN_SELECT)
    .single();

if (error) {
  console.error("🔥 CREATE STORE PIN ERROR:", error);
  console.error("🔥 INSERT PAYLOAD:", insertPayload);
  throw error;
}  

return mapStorePinRow(data);
}

export async function updateStorePin(pinId, patch) {
  const updatePayload = buildUpdatePayload(patch);

  const { data, error } = await supabase
    .from("store_pin")
    .update(updatePayload)
    .eq("id", pinId)
    .select(STORE_PIN_SELECT)
    .single();

  if (error) throw error;
  return mapStorePinRow(data);
}

export async function deleteStorePin(pinId) {
  const { error } = await supabase.from("store_pin").delete().eq("id", pinId);
  if (error) throw error;
  return true;
}