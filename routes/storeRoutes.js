import express from "express";
import { getStoreController, updateStoreController } from '../controllers/storeController.js';

const storeRouter = express.Router();

storeRouter.get('/:store_id', getStoreController);
storeRouter.put('/:store_id', updateStoreController);

export default storeRouter;