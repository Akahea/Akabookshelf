import { useState } from "react";
import { TextInput } from '../UI/TextInput'
import { MyButton } from '../UI/MyButton'
import MySelect from '../UI/MySelect'
import { BOOK_STATUS } from "../../constants/bookStatus";
import { BOOK_TYPE } from "../../constants/bookType";
import type { Book } from "../../types/book";
import { Trash } from "lucide-react";


type BookModalMode = "create" | "edit";

type BookModalProps = {
    mode: BookModalMode;
    openModal: boolean;
    closeModal: () => void;
    book?: Book;
    onSaved: () => void;
    onDeleted: () => void;
};

const BookModal  = ({ openModal, closeModal, mode, book, onSaved, onDeleted  }: BookModalProps) => {
    const [formData, setFormData] = useState({
        title: book?.title ?? "",
        author: book?.author ?? "",
        type: book?.type ?? "MANGA",
        ownedVolumes: book?.ownedVolumes ?? 1,
        status: book?.status ?? "TO_READ",
        rating: book?.rating ?? "",
        personalNotes: book?.personalNotes ?? "",
    });

    function updateField(field: string, value: string | number) {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const url =
            mode === "edit" && book
                ? `http://localhost:3001/api/books/${book.id}`
                : "http://localhost:3001/api/books";

        const method = mode === "edit" ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        onSaved();
        closeModal();

        const savedBook = await response.json();

        console.log(savedBook);
    }

    async function handleDelete() {
        if (!book) return;

        await fetch(`http://localhost:3001/api/books/${book.id}`, {
            method: "DELETE",
        });

        onDeleted();
        closeModal();
        }

    if (openModal === false) return null;

    return(
        <div
        className="fixed insert-0 z-50 top-[15%] left-1/2 -translate-x-1/2 rounded-2xl p-5 transition shadow-[0px_0px_18px_0px_rgba(0,0,0,0.8)] w-[30%]"
        style={{
        backgroundColor: "var(--background)",
        border: "1px solid var(--border)",
        }}>
            <div className="flex justify-between items-center flex-row-reverse">
                <MyButton onClick={closeModal}>X</MyButton>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <TextInput label="Titre du livre"
                        value={formData.title}
                        onChange={(event) => updateField("title", event.target.value)}
                        required/>
                    <MySelect
                        label="Type de livre"
                        value={formData.type}
                        options={BOOK_TYPE}
                        onChange={(event) => updateField("type", event.target.value)}
                    />
                    <TextInput label="Auteur"
                        value={formData.author}
                        onChange={(event) => updateField("author", event.target.value)}/>
                    <MySelect
                        label="Progression de lectures"
                        value={formData.status}
                        options={BOOK_STATUS}
                        onChange={(event) => updateField("status", event.target.value)}
                    />
                    {/* TODO: Remplacer ce champ par un système de notation avec des étoiles */}
                    <TextInput label="Note de l'oeuvre"
                        value={formData.rating}
                        onChange={(event) => updateField("rating", event.target.value === "" ? "" : Number(event.target.value))}/>
                    <TextInput label="Notes personnelles"
                        value={formData.personalNotes}
                        onChange={(event) => updateField("personalNotes", event.target.value)}/>
                </div>
                {mode === "create"&& (
                    <div className="flex justify-center py-5">
                        <MyButton type="submit">Crée le livre</MyButton>
                    </div>
                    )
                }
                {mode === "edit" && (
                    <div className="flex justify-between py-5">
                        <MyButton
                            type="button"
                            onClick={handleDelete}
                        >
                            Supprimer
                        </MyButton>

                        <MyButton type="submit">
                            Enregistrer
                        </MyButton>
                    </div>
                )}
            </form>
        </div>
    )
}

export default BookModal