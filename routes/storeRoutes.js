import express from "express";
import { getStoreController, updateStoreController, getStoreFromGenreController } from '../controllers/storeController.js';

const storeRouter = express.Router();

storeRouter.get('/:store_id', getStoreController);
storeRouter.get('/', getStoreFromGenreController);
storeRouter.put('/:store_id', updateStoreController);

export default storeRouter;