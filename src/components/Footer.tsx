export default function Footer() {
    return (
        <footer className="flex items-center justify-center gap-2 py-12 text-sm font-[400] text-neutral-600">
            <span>Project repo:</span>
            <a
                href="https://github.com/aliem-r/simple-todo-app"
                target="_blank"
                className="text-neutral-600 underline transition duration-100 hover:text-green-400"
            >
                @aliem-r/simple-todo-app
            </a>
        </footer>
    );
}
