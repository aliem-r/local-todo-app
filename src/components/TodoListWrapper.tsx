import TodoItem from "./TodoItem";

export default function TodoListWrapper() {
    return (
        <section
            className={
                "flex flex-col gap-2 w-sm bg-neutral-900 p-4 rounded-2xl transition duration-300"
            }
        >
            <h2 className="text-lg font-medium mb-1">To-dos</h2>

            <ul className="flex flex-col gap-2">
                <TodoItem id="1">First Task</TodoItem>
                <TodoItem id="2">Second Task</TodoItem>
                <TodoItem id="3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iusto, corporis est magni at debitis dolorem in non fugit
                    delectus unde amet voluptatem laudantium cum facilis
                    officiis similique ad saepe nihil.
                </TodoItem>
            </ul>
        </section>
    );
}
