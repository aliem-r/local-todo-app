import {
    IconDeviceFloppy,
    IconPencil,
    IconSquareRoundedCheck,
    IconSquareRoundedCheckFilled,
    IconTrash,
} from "@tabler/icons-react";
import { memo, useEffect, useState } from "react";
import { cn } from "../utils";

type TodoItemProps = {
    id: string;
    text: string;
    isEditing: boolean;
    isDimmed: boolean;
    onStartEditing: (id: string) => void;
    onSaveEditedTodo: (id: string, text: string) => void;
    onHandleCancelEditing: () => void;
    completed: boolean;
    onToggleCheck: (id: string) => void;
    onRemoveTodo: (id: string) => void;
};

export default memo(function TodoItem({
    id,
    text,
    isEditing,
    isDimmed,
    onStartEditing,
    onSaveEditedTodo,
    onHandleCancelEditing,
    completed,
    onToggleCheck,
    onRemoveTodo,
}: TodoItemProps) {
    const [hover, setHover] = useState(false);
    const [draft, setDraft] = useState(text);

    useEffect(() => {
        if (isEditing) setDraft(text);
    }, [isEditing, text]);

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
                isEditing && "border-neutral-500 hover:border-neutral-500",
                isDimmed && "hover:border-neutral-800"
            )}
        >
            <div
                className={cn(
                    "absolute inset-0 z-10 bg-neutral-900/60 transition-opacity duration-100",
                    // when not dimmed, make it fully transparent and non-interactive
                    isDimmed ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            />
            <label
                htmlFor={id}
                className="flex flex-1 gap-2 cursor-pointer p-3 select-none overflow-hidden"
            >
                {isEditing ? (
                    <>
                        <button
                            className="cursor-pointer"
                            onClick={() => onRemoveTodo(id)}
                        >
                            <IconTrash
                                size={20}
                                className="transition duration-100 text-rose-600 hover:text-rose-400 shrink-0"
                            />
                        </button>
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
                    </>
                ) : (
                    <>
                        <input
                            type="checkbox"
                            id={id}
                            checked={completed}
                            onChange={() => onToggleCheck(id)}
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
                        <span
                            className={cn(
                                "text-sm",
                                completed && "line-through text-neutral-400"
                            )}
                        >
                            {text}
                        </span>
                    </>
                )}
            </label>
            {isEditing ? (
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
                        hover && !isDimmed ? "opacity-100" : "opacity-0",
                        "transition duration-100 cursor-pointer text-neutral-600  hover:bg-neutral-700/40 hover:text-neutral-100 p-2 rounded-lg mr-1",
                        isEditing &&
                            "text-neutral-100 bg-neutral-700 hover:bg-neutral-600 opacity-100"
                    )}
                >
                    <IconPencil size={20} stroke={1.5} />
                </button>
            )}
        </li>
    );
});
