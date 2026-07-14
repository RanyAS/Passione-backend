import { getAllHistory, insertHistory, deleteHistory } from "../services/historyService.js";

export async function getAllHistoryController(req, res) {
    try {
        const user_id = req.params.user_id;

        const histories = await getAllHistory(user_id);

        return res.status(200).json(histories);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

export async function insertHistoryController(req, res) {
    try {
        const insert_data = req.body;

        const inserted_history = await insertHistory(insert_data);

        if (!inserted_history) {
            return res.status(404).json({
                message: "Failed to insert history",
            });
        }

        return res.status(201).json(inserted_history);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

export async function deleteHistoryController(req, res) {
    try {
        const history_id = req.params.history_id;

        const deleted_history = await deleteHistory(history_id);

        if (!deleted_history) {
            return res.status(404).json({
                message: "History not found.",
            });
        }

        return res.status(200).json(deleted_history);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}