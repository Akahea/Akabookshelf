import express from "express";
import cors from "cors";
import "dotenv/config";
import bookRoutes from "./routes/book";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});