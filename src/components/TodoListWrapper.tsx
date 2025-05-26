import { useCallback, useState } from "react";
import { addTodo, getTodoList, toggleTodoCheck } from "../todos/todosService";
import type { Todo } from "../todos/todoTypes";
import NewTodoForm from "./NewTodoForm";
import TodoItem from "./TodoItem";

export default function TodoListWrapper() {
    const [todoList, setTodoList] = useState<Todo[]>(getTodoList());

    const handleAddNewTodo = useCallback((text: string) => {
        setTodoList(addTodo(text));
    }, []);

    const handleToggleCheck = useCallback((id: string) => {
        setTodoList(toggleTodoCheck(id));
    }, []);

    return (
        <section
            className={
                "flex flex-col gap-2 w-sm bg-neutral-900 p-4 rounded-2xl transition duration-300"
            }
        >
            <h2 className="text-lg font-medium mb-1">To-dos</h2>
            <NewTodoForm onAddNewTodo={handleAddNewTodo} />
            <ul className="flex flex-col gap-2">
                {todoList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        completed={todo.completed}
                        onToggleCheck={handleToggleCheck}
                    >
                        {todo.text}
                    </TodoItem>
                ))}
            </ul>
        </section>
    );
}
