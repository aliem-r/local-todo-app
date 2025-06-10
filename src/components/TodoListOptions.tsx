import {
    IconDotsVertical,
    IconSquareRoundedCheck,
    IconSquareRoundedCheckFilled,
    IconSquareRoundedLetterI,
    IconSquareRoundedLetterIFilled,
    IconTrash,
} from "@tabler/icons-react";
import { useEffect, useRef, useState, type JSX } from "react";
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
    disabled?: boolean;
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
            disabled: pendingCount === 0,
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
            disabled: completedCount === 0,
            action: onRemoveCompleted,
        },
        clearAll: {
            label: "Clear all to-dos",
            icon: <IconTrash size={18} stroke={1.5} />,
            disabled: pendingCount === 0 && completedCount === 0,
            action: onClearAll,
        },
    };

    return (
        <div className={cn("to-do-options", isOptionsOpen && "open")}>
            <button
                ref={optionsButtonRef}
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            >
                <IconDotsVertical size={20} />
            </button>
            {isOptionsOpen && (
                <ul ref={optionsListRef} className="to-do-options">
                    <li>List options</li>
                    {Object.entries(options).map(
                        ([
                            key,
                            { label, icon, hoverIcon, disabled, action },
                        ]) => (
                            <li
                                key={key}
                                className={cn("group", disabled && "disabled")}
                                onClick={() => {
                                    action?.();
                                    setIsOptionsOpen(false);
                                }}
                            >
                                <span className="icon">{icon}</span>
                                <span className="hover-icon">
                                    {hoverIcon ?? icon}
                                </span>
                                <span>{label}</span>
                            </li>
                        ),
                    )}
                </ul>
            )}
        </div>
    );
}
