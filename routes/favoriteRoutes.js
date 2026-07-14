import express from "express";
import { getAllFavStoreController, addFavStoreController, deleteFavStoreController } from "../controllers/favoriteController.js";

const favRouter = express.Router();

favRouter.get('/:user_id', getAllFavStoreController);
favRouter.post('/', addFavStoreController);
favRouter.delete('/:user_id/:store_id', deleteFavStoreController);

export default favRouter;