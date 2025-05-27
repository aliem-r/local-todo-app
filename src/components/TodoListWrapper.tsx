import { useCallback, useEffect, useState } from "react";
import { addTodo, getTodoList, toggleTodoCheck } from "../todos/todosService";
import type { Todo } from "../todos/todoTypes";
import NewTodoForm from "./NewTodoForm";
import TodoItem from "./TodoItem";
import CompletedProgress from "./CompletedProgress";
import { cn } from "../utils";
import { IconSquareRoundedCheck } from "@tabler/icons-react";

export default function TodoListWrapper() {
    const [todoList, setTodoList] = useState<Todo[]>(getTodoList());
    const [completed, setCompleted] = useState(0);

    useEffect(() => {
        const completed = todoList.filter((todo) => todo.completed).length;
        setCompleted(completed);
    }, [todoList]);

    const handleAddNewTodo = useCallback((text: string) => {
        setTodoList(addTodo(text));
    }, []);

    const handleToggleCheck = useCallback((id: string) => {
        setTodoList(toggleTodoCheck(id));
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
                            completed={todo.completed}
                            onToggleCheck={handleToggleCheck}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}
