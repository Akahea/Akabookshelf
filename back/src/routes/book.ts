import { Router } from "express";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();
const router = Router();


router.get("/api/books", async (request, response) => {
    const books = await prisma.book.findMany();
    response.json(books)
});

router.post("/api/books", async (request, response) => {
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

router.delete("/api/books/:id", async (request, response) => {
    const bookID = request.params.id;
    await prisma.book.delete({
        where: {
            id: bookID,
        }
    });
    response.status(200).json({ message: "Book deleted" });
});

router.put("/api/books/:id", async (request, response) => {
    const bookID = request.params.id;
    const bookData = request.body;

    if (!bookData.title?.trim()) {
        return response.status(400).json({ error: "Missing title" });
    }

    const newBook = await prisma.book.update({
        where: {
            id: bookID,
        },
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
    response.status(200).json(newBook);
});

export default router;