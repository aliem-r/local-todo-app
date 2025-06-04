import {
    IconDotsVertical,
    IconSquareRoundedCheck,
    IconSquareRoundedCheckFilled,
    IconSquareRoundedLetterI,
    IconSquareRoundedLetterIFilled,
    IconTrash,
} from "@tabler/icons-react";
import { useEffect, useRef, useState, type JSX } from "react";
import { Fragment } from "react/jsx-runtime";
import { cn } from "../utils";

type TodoListOptionsProps = {
    pendingCount: number;
    completedCount: number;
    onMarkAllCompleted?: () => void;
    onRemoveCompleted?: () => void;
    onClearAll?: () => void;
};

type Option = {
    label: string;
    icon: JSX.Element;
    hoverIcon?: JSX.Element;
    disabled?: string;
    action?: () => void;
};

export default function TodoListOptions({
    pendingCount,
    completedCount,
    onMarkAllCompleted,
    onRemoveCompleted,
    onClearAll,
}: TodoListOptionsProps) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const optionsButtonRef = useRef<HTMLButtonElement>(null);
    const optionsListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!isOptionsOpen) return;
        const optionsButton = optionsButtonRef.current;
        const optionsList = optionsListRef.current;
        const handleClickOutside = (e: MouseEvent) => {
            if (
                optionsButton &&
                optionsList &&
                !optionsButton.contains(e.target as Node) &&
                !optionsList.contains(e.target as Node)
            ) {
                console.log("Clicked outside options button");
                setIsOptionsOpen(false);
            }
        };

        addEventListener("click", handleClickOutside);
        return () => {
            removeEventListener("click", handleClickOutside);
        };
    }, [isOptionsOpen]);

    const options: Record<string, Option> = {
        markAllCompleted: {
            label: "Mark all as completed",
            icon: <IconSquareRoundedCheck size={18} stroke={1.5} />,
            hoverIcon: <IconSquareRoundedCheckFilled size={18} stroke={1.5} />,
            disabled:
                pendingCount === 0 ? " opacity-50 pointer-events-none" : "",
            action: onMarkAllCompleted,
        },
        removeCompleted: {
            label: "Remove completed to-dos",
            icon: (
                <IconSquareRoundedLetterI
                    size={18}
                    stroke={1.5}
                    className="rotate-90"
                />
            ),
            hoverIcon: (
                <IconSquareRoundedLetterIFilled
                    size={18}
                    stroke={1.5}
                    className="rotate-90"
                />
            ),
            disabled:
                completedCount === 0 ? " opacity-40 pointer-events-none" : "",
            action: onRemoveCompleted,
        },
        clearAll: {
            label: "Clear all to-dos",
            icon: <IconTrash size={18} stroke={1.5} />,
            disabled:
                pendingCount === 0 && completedCount === 0
                    ? " opacity-40 pointer-events-none"
                    : "",
            action: onClearAll,
        },
    };

    return (
        <Fragment>
            <button
                ref={optionsButtonRef}
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                className={cn(
                    "transition duration-100 cursor-pointer relative -top-1 -right-1 text-neutral-500 hover:text-neutral-100 p-1 bg-neutral-900 hover:bg-neutral-800 rounded-lg",
                    isOptionsOpen && "text-neutral-100 bg-neutral-800"
                )}
            >
                <IconDotsVertical size={20} />
            </button>
            {isOptionsOpen && (
                <ul
                    ref={optionsListRef}
                    className="absolute -right-1 top-full z-10 flex flex-col min-w-50 gap-0.5 p-2 rounded-lg bg-neutral-800 border border-neutral-700/40"
                >
                    <li className="p-1 px-2.5 text-xs text-neutral-600 font-[400] mb-1">
                        List options
                    </li>
                    {Object.entries(options).map(
                        ([
                            key,
                            { label, icon, hoverIcon, disabled, action },
                        ]) => (
                            <li
                                key={key}
                                className={cn(
                                    "flex gap-2 items-center flex-1 group p-1 pr-3 pl-1.5 hover:bg-neutral-700/40 rounded-md text-sm font-[400] text-neutral-500 hover:text-neutral-100 cursor-pointer transition duration-100",
                                    disabled
                                )}
                                onClick={() => {
                                    action?.();
                                    setIsOptionsOpen(false);
                                }}
                            >
                                <span className="opacity-100 group-hover:opacity-0">
                                    {icon}
                                </span>
                                <span className=" absolute opacity-0 group-hover:opacity-100">
                                    {hoverIcon ?? icon}
                                </span>
                                <span>{label}</span>
                            </li>
                        )
                    )}
                </ul>
            )}
        </Fragment>
    );
}
