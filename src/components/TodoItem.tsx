import {
    IconSquareRoundedCheck,
    IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";
import { cn } from "../utils";
import { memo } from "react";

type TodoItemProps = {
    children: React.ReactNode;
    id: string;
    completed: boolean;
    onToggleCheck: (id: string) => void;
};

export default memo(function TodoItem({
    children,
    id,
    completed,
    onToggleCheck,
}: TodoItemProps) {
    console.log("TodoItem render");
    return (
        <li className="flex gap-2 bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-xl">
            <label
                htmlFor={id}
                className="flex flex-1 gap-2 cursor-pointer p-3 select-none"
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
                <span
                    className={cn(
                        "text-sm",
                        completed ? "line-through text-neutral-400" : ""
                    )}
                >
                    {children}
                </span>
            </label>
        </li>
    );
});
