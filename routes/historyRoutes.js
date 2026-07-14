import express from "express";
import { getAllHistoryController, insertHistoryController, deleteHistoryController } from "../controllers/historyController.js";

const historyRouter = express.Router();

historyRouter.get('/:user_id', getAllHistoryController);
historyRouter.post('/', insertHistoryController);
historyRouter.delete('/:history_id', deleteHistoryController);

export default historyRouter;