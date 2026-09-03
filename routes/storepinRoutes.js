import express from "express";
import { 
  getAllStorePinsController, 
  getStorePinController, 
  createStorePinController, 
  updateStorePinController, 
  deleteStorePinController,
  getActiveStorePinsController,
  getAllActiveStorePinsController,
} from "../controllers/storepinController.js";

const storepinRouter = express.Router();

storepinRouter.get('/store/:store_id', getAllStorePinsController);
storepinRouter.get('/store/:store_id/active', getActiveStorePinsController);
storepinRouter.get('/active', getAllActiveStorePinsController);
storepinRouter.get('/:pin_id', getStorePinController);
storepinRouter.post('/', createStorePinController);
storepinRouter.patch('/:pin_id', updateStorePinController);
storepinRouter.delete('/:pin_id', deleteStorePinController);

export default storepinRouter;