import type { Book } from "../../types/book";
import { Pencil } from "lucide-react";

type BookCardProps = {
    book: Book;
    onEdit: (book: Book) => void;
};

export function BookCard({book, onEdit}: BookCardProps) {
    return (
        <article
            key={book.id}
            className="rounded-2xl p-5 shadow-sm transition hover:-translate-y-1 group relative"
            style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            }}
        >
            <div className="flex justify-between">
                <p
                    className="text-sm uppercase"
                    style={{ color: "var(--text-muted)" }}
                >
                    {book.type}
                </p>
                <Pencil
                    className="
                        opacity-0
                        scale-75
                        transition-all
                        duration-200
                        group-hover:opacity-100
                        group-hover:scale-100 "
                    size={20}
                    onClick={() => onEdit(book)}
                />
            </div>
            <h2 className="mt-2 text-xl font-semibold">{book.title}</h2>
            <p className="mt-1" style={{ color: "var(--text-muted)" }}>
                {book.author}
            </p>

            <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
                Statut : {book.status}
            </p>

            {book.rating && (
                <p className="mt-2 text-sm" style={{ color: "var(--accent)" }}>
                    Note : {book.rating}/5
                </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
                {book.tags?.map((tag) => (
                <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-xs"
                    style={{
                    backgroundColor: "var(--surface-secondary)",
                    color: "var(--text)",
                    }}
                >
                    {tag}
                </span>
            ))}
            </div>
        </article>
    );
}