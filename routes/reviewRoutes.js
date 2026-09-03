import express from "express";
import { getReviewController, insertReviewController, deleteReviewController, getReviewsByUserController } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get('/user/:user_id', getReviewsByUserController);
reviewRouter.get('/:store_id', getReviewController);
reviewRouter.post('/', insertReviewController);
reviewRouter.delete('/:review_id', deleteReviewController);

export default reviewRouter;