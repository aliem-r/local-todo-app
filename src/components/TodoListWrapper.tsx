import {
    IconSquareRoundedCheck,
    IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
    addTodo,
    clearCompleted,
    clearTodoList,
    editTodo,
    getTodoList,
    removeTodo,
    toggleTodoCheck,
} from "../todos/todosService";
import type { Todo } from "../todos/todoTypes";
import { cn } from "../utils";
import CompletedProgress from "./CompletedProgress";
import NewTodoForm from "./NewTodoForm";
import TodoListControls from "./TodoListOptions";
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
        [todoList]
    );

    // Filter and sort completed todos by completion date
    const completedTodos = useMemo(
        () =>
            todoList
                .filter((todo) => todo.completed)
                .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0)),
        [todoList]
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

    const handleClearCompleted = useCallback(() => {
        setTodoList(clearCompleted());
    }, []);

    const handleClearTodoList = useCallback(() => {
        clearTodoList();
        setTodoList([]);
    }, []);

    return (
        <section
            className={cn(
                "flex flex-col gap-2.5 w-sm bg-neutral-900 p-5 rounded-3xl transition duration-300",
                completedTodos.length === todoList.length && todoList.length > 0
                    ? "border border-green-800 shadow-lg  shadow-green-500/10"
                    : "border border-neutral-800"
            )}
        >
            <h2 className="text-lg font-medium mb-1">To-dos</h2>
            <CompletedProgress
                percentage={percentage}
                className="mb-3 font-mono"
            >
                {`${completedTodos.length}/${todoList.length} DONE`}
            </CompletedProgress>
            <NewTodoForm onAddNewTodo={handleAddNewTodo} />
            <TodoListSection
                emptyMessage={
                    <div
                        className="flex items-center gap-2 border border-dashed border-neutral-700/70 rounded-xl
                       text-neutral-600/60 p-3 text-sm font-[400]"
                    >
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
                <div className="flex items-center gap-2 text-neutral-600 text-sm font-[400] mt-1 mb-1">
                    <span>Completed</span>
                    <hr className="flex-1 border-neutral-700" />
                </div>
            )}
            <TodoListSection
                emptyMessage={
                    todoList.length === 0 ? null : (
                        <div
                            className="flex items-center gap-2 border border-dashed border-neutral-700/70 rounded-xl
                       text-neutral-600/60 p-3 text-sm font-[400]"
                        >
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
            {todoList.length > 0 && (
                <Fragment>
                    <div className="flex items-center gap-2 text-neutral-600 text-sm font-[400] mt-1 mb-1">
                        <span>To-do Options</span>
                        <hr className="flex-1 border-neutral-700" />
                    </div>
                    <TodoListControls
                        hasCompletedTasks={completedTodos.length > 0}
                        onClearCompleted={handleClearCompleted}
                        onClearTodoList={handleClearTodoList}
                    />
                </Fragment>
            )}
        </section>
    );
}
