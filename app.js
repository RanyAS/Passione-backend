import routes from "./routes/routes.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});