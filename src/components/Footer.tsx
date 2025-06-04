export default function Footer() {
    return (
        <footer className="flex justify-center items-center gap-2 text-sm font-[400] text-neutral-600 py-12">
            <span>Project repo:</span>
            <a
                href="https://github.com/aliem-r/simple-todo-app"
                target="_blank"
                className="text-neutral-600 hover:text-green-400 underline transition duration-100"
            >
                @aliem-r/simple-todo-app
            </a>
        </footer>
    );
}
