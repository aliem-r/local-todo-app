import { IconSquareRoundedCheck } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    addTodo,
    editTodo,
    getTodoList,
    removeTodo,
    toggleTodoCheck,
} from "../todos/todosService";
import type { Todo } from "../todos/todoTypes";
import { cn } from "../utils";
import CompletedProgress from "./CompletedProgress";
import NewTodoForm from "./NewTodoForm";
import TodoItem from "./TodoItem";

export default function TodoListWrapper() {
    const [todoList, setTodoList] = useState<Todo[]>(getTodoList());
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "todoList") {
                setTodoList(getTodoList());
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const completed = useMemo(() => {
        return todoList.filter((todo) => todo.completed).length;
    }, [todoList]);

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

    return (
        <section
            className={cn(
                "flex flex-col gap-2.5 w-sm bg-neutral-900 p-5 rounded-3xl transition duration-300",
                completed === todoList.length && todoList.length > 0
                    ? "border border-green-800 shadow-lg  shadow-green-500/10"
                    : "border border-neutral-800"
            )}
        >
            <h2 className="text-lg font-medium mb-1">To-dos</h2>
            <CompletedProgress
                percentage={
                    todoList.length === 0
                        ? 0
                        : (completed * 100) / todoList.length
                }
                className="mb-3 font-mono"
            >{`${completed}/${todoList.length} DONE`}</CompletedProgress>
            <NewTodoForm onAddNewTodo={handleAddNewTodo} />
            {todoList.length === 0 ? (
                <div className="flex items-center gap-2 border border-dashed border-neutral-700 rounded-xl text-neutral-600 p-3 text-sm font-[400]">
                    <IconSquareRoundedCheck size={20} stroke={1} /> No todos
                    yet. Add one!
                </div>
            ) : (
                <ul className="flex flex-col gap-2">
                    {todoList.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            text={todo.text}
                            editing={editingId === todo.id}
                            dimmed={editingId !== null && editingId !== todo.id}
                            onStartEditing={handleStartEditing}
                            onSaveEditedTodo={handleSaveEditedTodo}
                            onCancelEditing={handleCancelEditing}
                            completed={todo.completed}
                            onToggleCheck={handleToggleCheck}
                            onRemoveTodo={handleRemoveTodo}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}
