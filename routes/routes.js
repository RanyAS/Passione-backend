import express from "express";
import genreRouter from "./genreRoutes.js"
import userRouter from "./userRoutes.js";
import storeRouter from "./storeRoutes.js";
import menuRouter from "./menuRoutes.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/genres", genreRouter);
router.use("/stores", storeRouter);
router.use("/menu", menuRouter);

export default router;
