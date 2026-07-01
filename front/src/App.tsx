import { useEffect, useState } from "react";
import { BookCard } from "./components/BookCard";
import type { Book } from "./types/book";

type Theme = "sakura" | "coffee" | "matcha" | "fantasy";

const themes: Theme[] = ["sakura", "coffee", "matcha", "fantasy"];

function App() {
  const [theme, setTheme] = useState<Theme>("sakura");
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("bookshelf-theme", theme);
  }, [theme]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("http://localhost:3001/api/books");
      const data = await response.json();
      setBooks(data);
    } fetchBooks();
  }, []);

  function handleThemeChange() {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  }
  console.log("books =", books);

  return (
    <main className="min-h-screen px-8 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">BookShelf</h1>
            <p className="mt-3" style={{ color: "var(--text-muted)" }}>
              Ta bibliothèque personnelle pour suivre tes lectures et ta collection..
            </p>
          </div>

          <button
            onClick={handleThemeChange}
            className="rounded-full px-4 py-2 font-medium shadow-sm transition hover:scale-105"
            style={{
              backgroundColor: "var(--primary)",
              color: "white",
            }}
          >
            Thème : {theme}
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;