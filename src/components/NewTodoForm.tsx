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
        <form onSubmit={handleAddNewTodo} className="flex gap-2 items-center">
            <input
                type="text"
                name="addTodo"
                id="addTodo"
                placeholder="Add a new to-do"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="transition duration-100 text-sm font-[400] border placeholder-neutral-500 border-neutral-700 hover:border-neutral-600 outline-0 focus:border-neutral-500 h-11 px-3 rounded-xl w-full"
            />
            <button
                type="submit"
                className="transition duration-100 flex justify-center items-center bg-neutral-300 hover:bg-neutral-100 cursor-pointer rounded-xl w-12 aspect-square"
            >
                <IconPlus className="text-neutral-900" size={22} />
            </button>
        </form>
    );
}
