import {
    IconDeviceFloppy,
    IconPencil,
    IconSquareRoundedCheck,
    IconSquareRoundedCheckFilled,
    IconSquareRoundedLetterIFilled,
} from "@tabler/icons-react";
import {
    Fragment,
    memo,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { cleanText, cn } from "../utils";

type TodoItemProps = {
    id: string;
    text: string;
    editing: boolean;
    dimmed: boolean;
    onStartEditing: (id: string) => void;
    onSaveEditedTodo: (id: string, text: string) => void;
    onCancelEditing: () => void;
    completed: boolean;
    onToggleCheck: (id: string) => void;
    onRemoveTodo: (id: string) => void;
};

export default memo(function TodoItem({
    id,
    text,
    editing,
    dimmed,
    onStartEditing,
    onSaveEditedTodo,
    onCancelEditing,
    completed,
    onToggleCheck,
    onRemoveTodo,
}: TodoItemProps) {
    const [draft, setDraft] = useState(text);
    const draftRef = useRef<HTMLTextAreaElement | null>(null);

    // Change textarea height based on content
    useLayoutEffect(() => {
        const textarea = draftRef.current;

        if (editing && textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [draft, editing]);

    // Move cursor to the end of the textarea when editing starts
    useEffect(() => {
        const textarea = draftRef.current;

        if (editing && textarea) {
            const len = textarea.value.length;
            textarea.setSelectionRange(len, len);
        }
    }, [editing]);

    const handleSave = () => {
        const cleanDraft = cleanText(draft);
        if (cleanDraft === "") return;
        if (cleanDraft === text) return onCancelEditing(); // If no change on save, cancel editing to avoid re-rendering todoList
        onSaveEditedTodo(id, cleanDraft);
        setDraft(cleanDraft);
    };

    return (
        <li
            className={cn(
                "group relative flex items-start overflow-hidden rounded-xl border border-neutral-800 bg-neutral-800 transition duration-100 hover:border-neutral-700",
                editing && "border-neutral-500 hover:border-neutral-500",
                dimmed && "hover:border-neutral-800",
            )}
        >
            <div
                className={cn(
                    "absolute inset-0 z-10 bg-neutral-900/60 transition-opacity duration-100",
                    // when not dimmed, make it fully transparent and non-interactive
                    dimmed ? "opacity-100" : "pointer-events-none opacity-0",
                )}
            />
            <label
                htmlFor={id}
                className="flex flex-1 cursor-pointer items-start gap-2 overflow-hidden p-3 select-none"
            >
                {editing ? (
                    <Fragment>
                        <button
                            className="cursor-pointer"
                            onClick={() => onRemoveTodo(id)}
                        >
                            <IconSquareRoundedLetterIFilled
                                size={20}
                                className="shrink-0 rotate-90 text-rose-600 transition duration-100 hover:text-rose-400"
                            />
                        </button>
                        <textarea
                            ref={draftRef}
                            value={draft}
                            autoFocus
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSave();
                                }
                                if (e.key === "Escape") {
                                    setDraft(text);
                                    onCancelEditing();
                                }
                            }}
                            rows={1}
                            className="relative h-5 flex-1 resize-none overflow-hidden border-b border-neutral-700 text-sm outline-0"
                        />
                    </Fragment>
                ) : (
                    <Fragment>
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
                                className="shrink-0 text-green-400"
                            />
                        ) : (
                            <IconSquareRoundedCheck
                                size={20}
                                stroke={1.5}
                                className="shrink-0 text-neutral-400"
                            />
                        )}
                        <span
                            className={cn(
                                "text-sm",
                                completed && "text-neutral-400 line-through",
                            )}
                        >
                            {text}
                        </span>
                    </Fragment>
                )}
            </label>
            {editing ? (
                <button
                    onClick={() => handleSave()}
                    className="mt-2 mr-2 cursor-pointer rounded-lg bg-neutral-700 p-1 text-neutral-100 opacity-100 transition duration-100 hover:bg-neutral-600"
                >
                    <IconDeviceFloppy size={20} stroke={1.5} />
                </button>
            ) : (
                <button
                    onClick={() => onStartEditing(id)}
                    className={cn(
                        "opacity-0 transition",
                        !dimmed && "group-hover:opacity-100",
                        "mt-2 mr-2 cursor-pointer rounded-lg p-1 text-neutral-600 transition duration-100 hover:bg-neutral-700/40 hover:text-neutral-100",
                        editing &&
                            "bg-neutral-700 text-neutral-100 opacity-100 hover:bg-neutral-600",
                    )}
                >
                    <IconPencil size={20} stroke={1.5} />
                </button>
            )}
        </li>
    );
});
