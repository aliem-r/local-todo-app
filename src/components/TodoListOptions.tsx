import { IconSquareRoundedLetterI, IconTrash } from "@tabler/icons-react";
import { cn } from "../utils";
import { memo } from "react";

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
    return (
        <section className="flex gap-2">
            <button
                onClick={() => onClearCompleted()}
                className={cn(
                    "flex gap-1 relative overflow-hidden transition duration-100 items-center text-sm font-[400] tracking-wide text-neutral-300 hover:text-rose-500 cursor-pointer rounded-xl bg-neutral-800 hover:bg-neutral-800 border border-neutral-700 hover:border-rose-500 py-1.5 px-2.5",
                    !hasCompletedTasks &&
                        "hover:border-neutral-700 text-neutral-500 hover:text-neutral-500 opacity-50 cursor-auto"
                )}
            >
                <IconSquareRoundedLetterI
                    className="rotate-90"
                    size={20}
                    stroke={1.5}
                />
                Delete completed
            </button>
            <button
                onClick={() => onClearTodoList()}
                className="transition duration-100 flex gap-1 items-center text-sm font-[400] tracking-wide text-neutral-300 hover:text-rose-500 cursor-pointer py-1.5 px-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-800 border border-neutral-700 hover:border-rose-500"
            >
                <IconTrash size={20} stroke={1.5} /> Clear List
            </button>
        </section>
    );
});
