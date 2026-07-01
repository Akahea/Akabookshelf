import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/books", (request, response) => {
    response.json([
        {
        id: "1",
        title: "Fullmetal Alchemist",
        author: "Hiromu Arakawa",
        type: "manga",
        status: "finished",
        rating: 5,
        tags: ["Aventure", "Fantasy", "Action"],
        notes: "Une œuvre incroyable du début à la fin.",
        createdAt: new Date().toISOString(),
        },
    ]);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});