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
                "group to-do-item",
                editing && "editing",
                dimmed && "dimmed",
            )}
        >
            <div className="overlay" />
            <label htmlFor={id}>
                {editing ? (
                    <Fragment>
                        <button
                            className="cursor-pointer"
                            onClick={() => onRemoveTodo(id)}
                        >
                            <IconSquareRoundedLetterIFilled
                                size={20}
                                className="remove-item-icon"
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
                                className="check-icon checked"
                            />
                        ) : (
                            <IconSquareRoundedCheck
                                size={20}
                                stroke={1.5}
                                className="check-icon"
                            />
                        )}
                        <span className={cn(completed && "checked")}>
                            {text}
                        </span>
                    </Fragment>
                )}
            </label>
            {editing ? (
                <button onClick={() => handleSave()} className="">
                    <IconDeviceFloppy size={20} stroke={1.5} />
                </button>
            ) : (
                <button onClick={() => onStartEditing(id)}>
                    <IconPencil size={20} stroke={1.5} />
                </button>
            )}
        </li>
    );
});
