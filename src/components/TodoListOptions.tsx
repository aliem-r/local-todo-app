import { IconSquareRoundedLetterI, IconTrash } from "@tabler/icons-react";
import { memo, useRef, useState } from "react";
import { cn } from "../utils";

type TodoListOptionsProps = {
    hasCompletedTasks?: boolean;
    onClearCompleted: () => void;
    onClearTodoList: () => void;
};

export default memo(function TodoListOptions({
    hasCompletedTasks = false,
    onClearCompleted,
    onClearTodoList,
}: TodoListOptionsProps) {
    const [activeButton, setActiveButton] = useState("");
    const timeoutRef = useRef<number | null>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        setActiveButton(e.currentTarget.id);
        const action =
            e.currentTarget.id === "delete-completed"
                ? onClearCompleted
                : onClearTodoList;
        timeoutRef.current = setTimeout(() => {
            action();
            setActiveButton("");
        }, 1550);
    };
    const handleMouseUp = () => {
        setActiveButton("");
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    return (
        <section className="flex gap-2">
            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                id="delete-completed"
                className={cn(
                    "group flex gap-1 relative overflow-hidden transition duration-100 items-center text-sm font-[400] tracking-wide text-neutral-400 hover:text-rose-600 cursor-pointer rounded-xl bg-neutral-800 hover:bg-neutral-800 border border-neutral-700 hover:border-rose-600 py-1.5 px-2.5",
                    activeButton === "delete-completed" &&
                        "hover:text-neutral-50 transition duration-[1500ms]",
                    !hasCompletedTasks &&
                        "hover:border-neutral-700 text-neutral-500 hover:text-neutral-500 opacity-50 cursor-auto"
                )}
            >
                <span
                    className={cn(
                        "absolute z-0 flex transition-all inset-0",
                        activeButton === "delete-completed"
                            ? "hold-to-delete-md"
                            : "hold-to-delete-mu"
                    )}
                ></span>
                <IconSquareRoundedLetterI
                    className="rotate-90 z-10"
                    size={18}
                    stroke={1.5}
                />
                <span className="z-10">Delete completed</span>
            </button>
            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                id="clear-todo-list"
                className={cn(
                    "group flex gap-1 relative overflow-hidden transition duration-100 items-center text-sm font-[400] tracking-wide text-neutral-400 hover:text-rose-600 cursor-pointer rounded-xl bg-neutral-800 hover:bg-neutral-800 border border-neutral-700 hover:border-rose-600 py-1.5 px-2.5",
                    activeButton === "clear-todo-list" &&
                        "hover:text-neutral-50 transition duration-[1500ms]"
                )}
            >
                <span
                    className={cn(
                        "absolute z-0 flex transition-all inset-0",
                        activeButton === "clear-todo-list"
                            ? "hold-to-delete-md"
                            : "hold-to-delete-mu"
                    )}
                ></span>
                <IconTrash className="z-10" size={18} stroke={1.5} />
                <span className="z-10">Clear List</span>
            </button>
        </section>
    );
});
