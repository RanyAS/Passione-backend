import express from "express";
import { getAllMenuController, getMenuController, insertMenuController, updateMenuController, deleteMenuController } from "../controllers/menuController.js";

const menuRouter = express.Router();

menuRouter.get('/store/:store_id', getAllMenuController);
menuRouter.get('/:menu_id', getMenuController);
menuRouter.post('/', insertMenuController);
menuRouter.put('/:menu_id', updateMenuController);
menuRouter.delete('/:menu_id', deleteMenuController);

export default menuRouter;