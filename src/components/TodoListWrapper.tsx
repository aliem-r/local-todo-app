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
import { AnimatePresence } from "motion/react";

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
                "to-do-list",
                completedTodos.length === todoList.length &&
                    todoList.length > 0 &&
                    "completed",
            )}
        >
            <div className="header-w">
                <h2>Your to-dos</h2>
                <TodoListOptions
                    pendingCount={pendingTodos.length}
                    completedCount={completedTodos.length}
                    onMarkAllCompleted={handleMarkAllCompleted}
                    onRemoveCompleted={handleRemoveCompleted}
                    onClearAll={handleClearAll}
                />
            </div>
            <CompletedProgress percentage={percentage}>
                {`${completedTodos.length}/${todoList.length} DONE`}
            </CompletedProgress>
            <NewTodoForm onAddNewTodo={handleAddNewTodo} />
            <AnimatePresence>
                <TodoListSection
                    emptyMessage={
                        <div className="empty-sec">
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
                    <div className="completed-separator">
                        <span>Completed</span>
                        <hr />
                    </div>
                )}
                <TodoListSection
                    emptyMessage={
                        todoList.length === 0 ? null : (
                            <div className="empty-sec">
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
            </AnimatePresence>
        </section>
    );
}
