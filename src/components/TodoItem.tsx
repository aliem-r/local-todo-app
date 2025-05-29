import {
    IconDeviceFloppy,
    IconPencil,
    IconSquareRoundedCheck,
    IconSquareRoundedCheckFilled,
    IconTrash,
} from "@tabler/icons-react";
import {
    Fragment,
    memo,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { cn } from "../utils";

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

    useLayoutEffect(() => {
        const textarea = draftRef.current;

        if (editing && textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [draft, editing]);

    useEffect(() => {
        const textarea = draftRef.current;

        if (editing && textarea) {
            const len = textarea.value.length;
            textarea.setSelectionRange(len, len);
        }
    }, [editing]);

    const handleSave = () => {
        const cleanDraft = draft.replace(/\s+/g, " ").trim();
        if (cleanDraft === "") return;
        if (cleanDraft === text) return onCancelEditing();
        onSaveEditedTodo(id, cleanDraft);
        setDraft(cleanDraft);
    };

    return (
        <li
            className={cn(
                "group relative transition duration-100 flex items-start overflow-hidden bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-xl",
                editing && "border-neutral-500 hover:border-neutral-500",
                dimmed && "hover:border-neutral-800"
            )}
        >
            <div
                className={cn(
                    "absolute inset-0 z-10 bg-neutral-900/60 transition-opacity duration-100",
                    // when not dimmed, make it fully transparent and non-interactive
                    dimmed ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            />
            <label
                htmlFor={id}
                className="flex items-start flex-1 gap-2 cursor-pointer p-3 select-none overflow-hidden"
            >
                {editing ? (
                    <Fragment>
                        <button
                            className="cursor-pointer"
                            onClick={() => onRemoveTodo(id)}
                        >
                            <IconTrash
                                size={20}
                                className="transition duration-100 text-rose-600 hover:text-rose-400 shrink-0"
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
                            className="outline-0 text-sm h-5 flex-1 border-b border-neutral-700 relative overflow-hidden resize-none"
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
                    </Fragment>
                )}
            </label>
            {editing ? (
                <button
                    onClick={() => handleSave()}
                    className="transition duration-100 cursor-pointer text-neutral-100 bg-neutral-700 hover:bg-neutral-600 opacity-100 p-1 rounded-lg mr-2 mt-2"
                >
                    <IconDeviceFloppy size={20} stroke={1.5} />
                </button>
            ) : (
                <button
                    onClick={() => onStartEditing(id)}
                    className={cn(
                        "opacity-0 transition",
                        !dimmed && "group-hover:opacity-100",
                        "transition duration-100 cursor-pointer text-neutral-600  hover:bg-neutral-700/40 hover:text-neutral-100 p-1 rounded-lg mr-2 mt-2",
                        editing &&
                            "text-neutral-100 bg-neutral-700 hover:bg-neutral-600 opacity-100"
                    )}
                >
                    <IconPencil size={20} stroke={1.5} />
                </button>
            )}
        </li>
    );
});
