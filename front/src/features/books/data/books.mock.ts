import type { Book } from "../../../types/book";

export const booksMock: Book[] = [
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
    {
    id: "2",
    title: "Frieren",
    author: "Kanehito Yamada",
    type: "manga",
    status: "reading",
    rating: 5,
    tags: ["Fantasy", "Émotion", "Voyage"],
    notes: "Très contemplatif.",
    createdAt: new Date().toISOString(),
    },
    {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    type: "book",
    status: "to read",
    tags: ["Science-fiction"],
    createdAt: new Date().toISOString(),
    },
];