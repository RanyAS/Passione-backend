import express from "express";
import { getUserController, updateUserController } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/:user_id', getUserController);
userRouter.put('/:user_id', updateUserController);

export default userRouter;