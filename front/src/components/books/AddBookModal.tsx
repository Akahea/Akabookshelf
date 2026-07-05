import { useState } from "react";
import { TextInput } from '../UI/TextInput'
import { MyButton } from '../UI/MyButton'
import MySelect from '../UI/MySelect'
import { BOOK_STATUS } from "../../constants/bookStatus";
import { BOOK_TYPE } from "../../constants/bookType";


type AddBookModalProps = {
    openModal: boolean;
    closeModal: () => void;
};

const AddBookModal = ({ openModal, closeModal }: AddBookModalProps) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        type: "MANGA",
        ownedVolumes: 1,
        status: "TO_READ",
        rating: "",
        personalNotes: "",
    });

    function updateField(field: string, value: string | number) {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch("http://localhost:3001/api/books", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const createdBook = await response.json();

        console.log("Livre créé :", createdBook);
    }

    if (openModal === false) return null;

    return(
        <div
        className="fixed top-[15%] left-1/2 -translate-x-1/2 rounded-2xl p-5 transition shadow-[0px_0px_18px_0px_rgba(0,0,0,0.8)] w-[30%]"
        style={{
        backgroundColor: "var(--background)",
        border: "1px solid var(--border)",
        }}>
            <div className="flex justify-end ">
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
                <div className="flex justify-center py-5">
                    <MyButton type="submit">Enregistrer</MyButton>
                </div>
            </form>
        </div>
    )
}

export default AddBookModal