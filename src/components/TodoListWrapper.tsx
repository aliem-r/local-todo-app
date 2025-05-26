import { useCallback, useState } from "react";
import TodoItem from "./TodoItem";
import NewTodoForm from "./NewTodoForm";

export default function TodoListWrapper() {
    const [todoList, setTodoList] = useState([
        { id: "1", text: "First Task", completed: true },
        { id: "2", text: "Second Task", completed: false },
        {
            id: "3",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, corporis est magni at debitis dolorem in non fugit delectus unde amet voluptatem laudantium cum facilis officiis similique ad saepe nihil.",
            completed: false,
        },
    ]);

    const handleAddNewTodo = useCallback(
        (text: string) => {
            setTodoList((prev) => [
                ...prev,
                { id: crypto.randomUUID(), text, completed: false },
            ]);
        },
        [setTodoList]
    );

    const handleToggleCheck = useCallback(
        (id: string) => {
            setTodoList((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, completed: !item.completed }
                        : item
                )
            );
        },
        [setTodoList]
    );

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
