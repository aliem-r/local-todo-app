import { Fragment } from "react/jsx-runtime";
import type { Todo } from "../todos/todoTypes";
import TodoItem from "./TodoItem";

type TodoListSectionProps = {
    items: Todo[];
    editingId: string | null;
    emptyMessage: React.ReactNode;
    onStartEditing: (id: string) => void;
    onSaveEditedTodo: (id: string, text: string) => void;
    onCancelEditing: () => void;
    onToggleCheck: (id: string) => void;
    onRemoveTodo: (id: string) => void;
};

export default function TodoListSection({
    items,
    editingId,
    emptyMessage,
    onStartEditing,
    onSaveEditedTodo,
    onCancelEditing,
    onToggleCheck,
    onRemoveTodo,
}: TodoListSectionProps) {
    return (
        <Fragment>
            {items.length === 0 ? (
                emptyMessage
            ) : (
                <ul className="flex flex-col gap-2">
                    {items.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            text={todo.text}
                            editing={editingId === todo.id}
                            dimmed={editingId !== null && editingId !== todo.id}
                            onStartEditing={onStartEditing}
                            onSaveEditedTodo={onSaveEditedTodo}
                            onCancelEditing={onCancelEditing}
                            completed={todo.completed}
                            onToggleCheck={onToggleCheck}
                            onRemoveTodo={onRemoveTodo}
                        />
                    ))}
                </ul>
            )}
        </Fragment>
    );
}
