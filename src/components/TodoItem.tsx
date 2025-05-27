import {
    IconDeviceFloppy,
    IconPencil,
    IconSquareRoundedCheck,
    IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";
import { memo, useEffect, useState } from "react";
import { cn } from "../utils";

type TodoItemProps = {
    id: string;
    text: string;
    editing: boolean;
    onStartEditing: (id: string) => void;
    onSaveEditedTodo: (id: string, text: string) => void;
    onHandleCancelEditing: () => void;
    completed: boolean;
    onToggleCheck: (id: string) => void;
};

export default memo(function TodoItem({
    id,
    text,
    editing,
    onStartEditing,
    onSaveEditedTodo,
    onHandleCancelEditing,
    completed,
    onToggleCheck,
}: TodoItemProps) {
    const [hover, setHover] = useState(false);
    const [draft, setDraft] = useState(text);

    useEffect(() => {
        if (editing) setDraft(text);
    }, [editing, text]);

    const handleSave = () => {
        const cleanDraft = draft.replace(/\s+/g, " ").trim();
        if (cleanDraft === "") return;
        onSaveEditedTodo(id, cleanDraft);
        setDraft(text);
    };

    return (
        <li
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={cn(
                "relative transition duration-100 flex items-center overflow-hidden bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-xl",
                editing ? "border-neutral-600 hover:border-neutral-500" : ""
            )}
        >
            <label
                htmlFor={id}
                className="flex flex-1 gap-2 cursor-pointer p-3 select-none overflow-hidden"
            >
                <input
                    type="checkbox"
                    id={id}
                    checked={completed}
                    onChange={() => !editing && onToggleCheck(id)}
                    className="hidden"
                />
                {completed ? (
                    <IconSquareRoundedCheckFilled
                        size={20}
                        className="text-green-400 shrink-0"
                    />
                ) : (
                    <IconSquareRoundedCheck
                        size={20}
                        stroke={1.5}
                        className="text-neutral-400 shrink-0"
                    />
                )}
                {editing ? (
                    <input
                        type="text"
                        value={draft}
                        autoFocus
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") onHandleCancelEditing();
                        }}
                        className="outline-0 text-sm h-5 flex-1 border-b border-neutral-700 relative bottom-[-1px]"
                    />
                ) : (
                    <span
                        className={cn(
                            "text-sm",
                            completed ? "line-through text-neutral-400" : ""
                        )}
                    >
                        {text}
                    </span>
                )}
            </label>
            {editing ? (
                <button
                    onClick={() => handleSave()}
                    className="transition duration-100 cursor-pointer text-neutral-100 bg-neutral-700 hover:bg-neutral-600 opacity-100 p-2 rounded-lg mr-1"
                >
                    <IconDeviceFloppy size={20} stroke={1.5} />
                </button>
            ) : (
                <button
                    onClick={() => onStartEditing(id)}
                    className={cn(
                        hover ? "opacity-100" : "opacity-0",
                        "transition duration-100 cursor-pointer text-neutral-600  hover:bg-neutral-700/40 hover:text-neutral-100 p-2 rounded-lg mr-1",
                        editing
                            ? "text-neutral-100 bg-neutral-700 hover:bg-neutral-600 opacity-100"
                            : ""
                    )}
                >
                    <IconPencil size={20} stroke={1.5} />
                </button>
            )}
        </li>
    );
});
