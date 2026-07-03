import express from 'express';
import { getGenresController } from '../controllers/genreController.js';

const genreRouter = express.Router();

genreRouter.get('/genres', getGenresController);

export default genreRouter;