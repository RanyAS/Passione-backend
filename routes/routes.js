import express from "express";
import genreRouter from "./genreRoutes.js"
import userRouter from "./userRoutes.js";
import storeRouter from "./storeRoutes.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/genres", genreRouter);
router.use("/stores", storeRouter);

export default router;
