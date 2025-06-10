import { IconPlus } from "@tabler/icons-react";
import { useState, type FormEvent } from "react";
import { cleanText } from "../utils";

type NewTodoFormProps = {
    onAddNewTodo: (text: string) => void;
};

export default function NewTodoForm({ onAddNewTodo }: NewTodoFormProps) {
    const [input, setInput] = useState("");

    const handleAddNewTodo = (e: FormEvent) => {
        e.preventDefault();
        const cleanInput = cleanText(input);
        if (cleanInput === "") return;
        onAddNewTodo(cleanInput);
        setInput("");
    };

    return (
        <form onSubmit={handleAddNewTodo} className="to-do-form">
            <input
                type="text"
                name="addTodo"
                id="addTodo"
                placeholder="Add a new to-do"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
                <IconPlus size={22} />
            </button>
        </form>
    );
}
