import { useEffect, useState } from "react";
import { BookCard } from "./components/books/BookCard";
import BookModal  from "./components/books/BookModal";
import type { Book } from "./types/book";
import { MyButton } from './components/UI/MyButton'


type Theme = "sakura" | "coffee" | "matcha" | "fantasy";

const themes: Theme[] = ["sakura", "coffee", "matcha", "fantasy"];

function App() {
  const [theme, setTheme] = useState<Theme>("sakura");
  const [books, setBooks] = useState<Book[]>([]);
  const [modalCreateOpen, setmodalCreateOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  function openEditModal(book: Book) {
    setSelectedBook(book);
  }

  function closeModal() {
    setSelectedBook(null);
  }

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

  async function fetchBooks() {
    const response = await fetch("http://localhost:3001/api/books");
    const data = await response.json();
    setBooks(data);
  }

  return (
    <main className="min-h-screen px-8 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">BookShelf</h1>
            <p className="mt-3" style={{ color: "var(--text-muted)" }}>
              Ta bibliothèque personnelle pour suivre tes lectures et ta collection.
            </p>
          </div>

          <MyButton onClick={() => setmodalCreateOpen(true)}>Ajout livre</MyButton>
          <BookModal mode="create" openModal={modalCreateOpen} closeModal={() => setmodalCreateOpen(false)} onSaved={fetchBooks} onDeleted={fetchBooks}></BookModal>
          {selectedBook && (
            <BookModal key={selectedBook.id} mode="edit" openModal={true} closeModal={closeModal} book={selectedBook} onSaved={fetchBooks} onDeleted={fetchBooks}
            />
          )}
          <MyButton onClick={handleThemeChange}>Thème : {theme}</MyButton>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onEdit={openEditModal}/>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;