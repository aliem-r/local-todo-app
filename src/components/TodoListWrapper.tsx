import {
    IconSquareRoundedCheck,
    IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    addTodo,
    clearCompleted,
    clearTodoList,
    editTodo,
    getTodoList,
    markAllCompleted,
    removeTodo,
    toggleTodoCheck,
} from "../todos/todosService";
import type { Todo } from "../todos/todoTypes";
import { cn } from "../utils";
import CompletedProgress from "./CompletedProgress";
import NewTodoForm from "./NewTodoForm";
import TodoListOptions from "./TodoListOptions";
import TodoListSection from "./TodoListSection";

export default function TodoListWrapper() {
    const [todoList, setTodoList] = useState<Todo[]>(getTodoList());
    const [editingId, setEditingId] = useState<string | null>(null);

    // Sync across tabs via storage event
    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "todoList") {
                setTodoList(getTodoList());
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    // Filter todos that are not completed
    const pendingTodos = useMemo(
        () => todoList.filter((todo) => !todo.completed),
        [todoList],
    );

    // Filter and sort completed todos by completion date
    const completedTodos = useMemo(
        () =>
            todoList
                .filter((todo) => todo.completed)
                .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0)),
        [todoList],
    );

    // Calculate the percentage of completed todos
    const percentage = useMemo(() => {
        return todoList.length === 0
            ? 0
            : (completedTodos.length * 100) / todoList.length;
    }, [todoList.length, completedTodos.length]);

    // Handlers for adding, editing, toggling, and removing todos
    const handleAddNewTodo = useCallback((text: string) => {
        setTodoList(addTodo(text));
    }, []);

    const handleToggleCheck = useCallback((id: string) => {
        setTodoList(toggleTodoCheck(id));
    }, []);

    const handleStartEditing = useCallback((id: string) => {
        setEditingId(id);
    }, []);
    const handleSaveEditedTodo = useCallback((id: string, text: string) => {
        setTodoList(editTodo(id, text));
        setEditingId(null);
    }, []);
    const handleCancelEditing = useCallback(() => {
        setEditingId(null);
    }, []);

    const handleRemoveTodo = useCallback((id: string) => {
        setTodoList(removeTodo(id));
        setEditingId(null);
    }, []);

    const handleMarkAllCompleted = useCallback(() => {
        setTodoList(markAllCompleted());
    }, []);

    const handleRemoveCompleted = useCallback(() => {
        setTodoList(clearCompleted());
    }, []);

    const handleClearAll = useCallback(() => {
        clearTodoList();
        setTodoList([]);
    }, []);

    return (
        <section
            className={cn(
                "flex w-sm flex-col gap-2.5 rounded-3xl bg-neutral-900 p-5 transition duration-300",
                completedTodos.length === todoList.length && todoList.length > 0
                    ? "border border-green-800 shadow-lg shadow-green-500/10"
                    : "border border-neutral-800",
            )}
        >
            <div className="relative mb-3 flex items-center justify-between">
                <h2 className="mb-1 text-lg font-medium">Your to-dos</h2>
                <TodoListOptions
                    pendingCount={pendingTodos.length}
                    completedCount={completedTodos.length}
                    onMarkAllCompleted={handleMarkAllCompleted}
                    onRemoveCompleted={handleRemoveCompleted}
                    onClearAll={handleClearAll}
                />
            </div>
            <CompletedProgress
                percentage={percentage}
                className="mb-3 font-mono"
            >
                {`${completedTodos.length}/${todoList.length} DONE`}
            </CompletedProgress>
            <NewTodoForm onAddNewTodo={handleAddNewTodo} />
            <TodoListSection
                emptyMessage={
                    <div className="flex items-center gap-2 rounded-xl border border-dashed border-neutral-700/70 p-3 text-sm font-[400] text-neutral-600/60">
                        <IconSquareRoundedCheck size={20} stroke={1} /> No
                        to-dos yet. Add one!
                    </div>
                }
                items={pendingTodos}
                editingId={editingId}
                onStartEditing={handleStartEditing}
                onSaveEditedTodo={handleSaveEditedTodo}
                onCancelEditing={handleCancelEditing}
                onToggleCheck={handleToggleCheck}
                onRemoveTodo={handleRemoveTodo}
            />
            {todoList.length > 0 && (
                <div className="mt-1 mb-1 flex items-center gap-2 text-sm font-[400] text-neutral-600">
                    <span>Completed</span>
                    <hr className="flex-1 border-neutral-700" />
                </div>
            )}
            <TodoListSection
                emptyMessage={
                    todoList.length === 0 ? null : (
                        <div className="flex items-center gap-2 rounded-xl border border-dashed border-neutral-700/70 p-3 text-sm font-[400] text-neutral-600/60">
                            <IconSquareRoundedCheckFilled
                                size={20}
                                stroke={1}
                            />{" "}
                            No completed to-dos yet
                        </div>
                    )
                }
                items={completedTodos}
                editingId={editingId}
                onStartEditing={handleStartEditing}
                onSaveEditedTodo={handleSaveEditedTodo}
                onCancelEditing={handleCancelEditing}
                onToggleCheck={handleToggleCheck}
                onRemoveTodo={handleRemoveTodo}
            />
        </section>
    );
}
