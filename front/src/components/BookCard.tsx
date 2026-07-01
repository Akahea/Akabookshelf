import type { Book } from "../types/book";

type BookCardProps = {
    book: Book;
};

export function BookCard({book}: BookCardProps) {
    return (
        <article
            key={book.id}
            className="rounded-2xl p-5 shadow-sm transition hover:-translate-y-1"
            style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            }}
        >
            <p
                className="text-sm uppercase"
                style={{ color: "var(--text-muted)" }}
            >
                {book.type}
            </p>
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