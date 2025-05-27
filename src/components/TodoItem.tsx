import {
    IconDeviceFloppy,
    IconPencil,
    IconSquareRoundedCheck,
    IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";
import { cn } from "../utils";
import { memo, useState } from "react";

type TodoItemProps = {
    id: string;
    text: string;
    completed: boolean;
    onToggleCheck: (id: string) => void;
};

export default memo(function TodoItem({
    id,
    text,
    completed,
    onToggleCheck,
}: TodoItemProps) {
    const [hover, setHover] = useState(false);
    const [editing, setEditing] = useState(false);

    return (
        <li
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={cn(
                "transition duration-100 flex items-center bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-xl",
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
                {editing ? (
                    <form className="flex">
                        <input
                            type="text"
                            name="editTodo"
                            id={`editTodo${id}`}
                            autoFocus
                            value={text}
                            className="outline-0 text-sm h-5 p-0"
                        />
                    </form>
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
            <button
                onClick={() => setEditing(!editing)}
                className={cn(
                    hover ? "opacity-100" : "opacity-0",
                    "transition duration-100 cursor-pointer text-neutral-600  hover:bg-neutral-700/40 hover:text-neutral-100 p-2 rounded-lg mr-1",
                    editing
                        ? "text-neutral-100 bg-neutral-700 hover:bg-neutral-600 opacity-100"
                        : ""
                )}
            >
                {editing ? (
                    <IconDeviceFloppy size={20} stroke={1.5} />
                ) : (
                    <IconPencil size={20} stroke={1.5} />
                )}
            </button>
        </li>
    );
});
