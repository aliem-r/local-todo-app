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
        <form onSubmit={handleAddNewTodo} className="flex items-center gap-2">
            <input
                type="text"
                name="addTodo"
                id="addTodo"
                placeholder="Add a new to-do"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="h-11 w-full rounded-xl border border-neutral-700 px-3 text-sm font-[400] placeholder-neutral-500 outline-0 transition duration-100 hover:border-neutral-600 focus:border-neutral-500"
            />
            <button
                type="submit"
                className="flex aspect-square w-12 cursor-pointer items-center justify-center rounded-xl bg-neutral-300 transition duration-100 hover:bg-neutral-100"
            >
                <IconPlus className="text-neutral-900" size={22} />
            </button>
        </form>
    );
}
