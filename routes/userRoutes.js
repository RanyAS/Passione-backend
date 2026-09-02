import express from "express";
import upload from "../middleware/upload.js";
import { getUserController, updateUserController, uploadUserImageController } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/:user_id', getUserController);
userRouter.put('/:user_id', updateUserController);
userRouter.post('/:user_id/image', upload.single('image'), uploadUserImageController)

export default userRouter;