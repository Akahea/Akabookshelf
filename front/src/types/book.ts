export type BookType = "book" | "manga" | "comic" | "bd" | "light_novel";

export type BookStatus = "to read" | "reading" | "finished" | "abandoned";

export type Book = {
  id: string;
  title: string;
  author: string;
  type: BookType;
  status: BookStatus;
  rating?: number;
  tags: string[];
  notes?: string;
  createdAt: string;
};