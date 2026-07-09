import { getStore, updateStore } from '../services/storeService.js';

const storeData = [
    "sname",
    "email",
    "address",
    "tel",
    "open_time",
    "site",
    "image_path",
]

export async function getStoreController(req, res){
    try {
        const store_id = req.params.store_id;

        const store = await getStore(store_id);

        if (!store) {
            return res.status(404).json({
                message: "Store not found",
            });
        }

        return res.status(200).json(store);
    } catch (error) {
        return res.status(500).json(
            {message: error.message}
        );
    }
}

export async function updateStoreController(req, res){
    try {
        const { store_id } = req.params;

        if (!store_id) {
            return res.status(400).json({
                message: "Store ID is required",
            })
        }

        const store_data = {};

        for (const field of storeData) {
            if (req.body[field] !== undefined) {
                store_data[field] = req.body[field];
            }
        }

        if (Object.keys(store_data).length === 0) {
            return res.status(400).json({
                message: "No data to update.",
            });
        }

        const updatedStore = await updateStore(store_id, store_data);

        if (!updatedStore) {
            return res.status(404).json({
                message: "Store not found.",
            });
        }

        return res.status(200).json(updatedStore);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}



