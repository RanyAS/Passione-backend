import { 
  getAllstorePin, 
  getstorePin, 
  createStorePin, 
  updateStorePin, 
  deleteStorePin,
  getActiveStorePins 
} from '../services/storepinService.js';

// GET all store pins for a store
export async function getAllStorePinsController(req, res) {
  try {
    const { store_id } = req.params;
    const data = await getAllstorePin(store_id);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'pinを取得する際にエラーが発生しました',
      error: error.message,
    });
  }
}

// GET a specific store pin
export async function getStorePinController(req, res) {
  try {
    const { pin_id } = req.params;
    const data = await getstorePin(pin_id);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'pinを取得する際にエラーが発生しました',
      error: error.message,
    });
  }
}

// GET active store pins for a store
export async function getActiveStorePinsController(req, res) {
  try {
    const { store_id } = req.params;
    const data = await getActiveStorePins(store_id);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'アクティブなpinを取得する際にエラーが発生しました',
      error: error.message,
    });
  }
}

// POST create a new store pin
export async function createStorePinController(req, res) {
  try {
    const payload = req.body;
    const data = await createStorePin(payload);

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'pinを作成する際にエラーが発生しました',
      error: error.message,
    });
  }
}

// PATCH update a store pin
export async function updateStorePinController(req, res) {
  try {
    const { pin_id } = req.params;
    const patch = req.body;

    if (!pin_id) {
      return res.status(400).json({
        success: false,
        message: 'pin_idが指定されていません',
      });
    }

    const updated = await updateStorePin(pin_id, patch);

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'pinを更新する際にエラーが発生しました',
      error: error.message,
    });
  }
}

// DELETE a store pin
export async function deleteStorePinController(req, res) {
  try {
    const { pin_id } = req.params;

    if (!pin_id) {
      return res.status(400).json({
        success: false,
        message: 'pin_idが指定されていません',
      });
    }

    await deleteStorePin(pin_id);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'pinを削除する際にエラーが発生しました',
      error: error.message,
    });
  }
}