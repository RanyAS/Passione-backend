import genreRouter from "./routes/genreRoutes.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', genreRouter);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});