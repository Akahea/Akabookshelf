import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/books", async (request, response) => {
    const books = await prisma.book.findMany();
    response.json(books)
});

app.post("/api/books", async (request, response) => {
    const bookData = request.body;
    if (!bookData.title?.trim()) {
        return response.status(400).json({ error: "Missing title" });
        }

    if (!bookData.type) {
        return response.status(400).json({ error: "Missing type" });
    }
    const newbook = await prisma.book.create({
        data: {
            title : bookData.title,
            author : bookData.author,
            type  : bookData.type,
            ownedVolumes : bookData.ownedVolumes,
            status : bookData.status,
            rating : bookData.rating,
            personalNotes : bookData.personalNotes,
        }
    });
    response.status(201).json(newbook);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});