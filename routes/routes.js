import express from "express";
import genreRouter from "./genreRoutes.js"
import userRouter from "./userRoutes.js";
import storeRouter from "./storeRoutes.js";
import menuRouter from "./menuRoutes.js";
import favRouter from "./favoriteRoutes.js";
import historyRouter from "./historyRoutes.js";
import reviewRouter from "./reviewRoutes.js";
import storepinRouter from "./storepinRoutes.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/genres", genreRouter);
router.use("/stores", storeRouter);
router.use("/menu", menuRouter);
router.use('/fav', favRouter);
router.use('/history', historyRouter);
router.use('/review', reviewRouter);
router.use('/storepin', storepinRouter);

export default router;
