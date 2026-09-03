import { getAllFavStore, addFavStore, deleteFavStore, checkFavStore } from "../services/favoriteService.js";

export async function getAllFavStoreController(req, res) {
    try {
        const user_id = req.params.user_id;

        const favorite_store = await getAllFavStore(user_id);

        return res.status(200).json(favorite_store);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

export async function checkFavStoreController(req, res) {
    try {
        const { user_id, store_id } = req.params;

        const isFavorite = await checkFavStore(user_id, store_id);

        return res.status(200).json({
            isFavorite,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export async function addFavStoreController(req, res) {
    try {
        const fav_data = req.body;

        const insert_fav = await addFavStore(fav_data);

        return res.status(201).json(insert_fav);
    } catch (error) {
        if (error.message === "Store is already in favorites.") {
            return res.status(409).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: error.message,
        });
    }
}

export async function deleteFavStoreController(req, res) {
    try {
        const { user_id, store_id } = req.params;

        const deleted_fav = await deleteFavStore(user_id, store_id);

        if (!deleted_fav) {
            return res.status(404).json({
                message: "Failed to delete fav",
            });
        }

        return res.status(200).json(deleted_fav);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}