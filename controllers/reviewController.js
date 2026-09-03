import { getReview, insertReview, deleteReview, getReviewsByUser } from "../services/reviewService.js";

export async function getReviewController(req, res) {
    try {
        const store_id = req.params.store_id;

        const reviews = await getReview(store_id);

        return res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export async function getReviewsByUserController(req, res) {
    try {
        const user_id = req.params.user_id;

        const reviews = await getReviewsByUser(user_id);

        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export async function insertReviewController(req, res) {
    try {
        const review_data = req.body;

        if (!review_data || Object.keys(review_data).length === 0) {
            return res.status(400).json({
                message: "Review data is required.",
            });
        }

        const insert_review = await insertReview(review_data);

        return res.status(201).json(insert_review);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export async function deleteReviewController(req, res) {
    try {
        const review_id = req.params.review_id;

        const deleted_review = await deleteReview(review_id);

        if (!deleted_review){
            res.status(404).json({
                message: "Review not found.",
            })
        }

        return res.status(200).json(deleted_review);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}