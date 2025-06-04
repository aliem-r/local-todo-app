import { IconSquareRoundedPlus2 } from "@tabler/icons-react";

export default function Header() {
    return (
        <header className="py-12 flex justify-around">
            <div className="flex items-center gap-2 font-medium text-2xl text-neutral-700">
                <IconSquareRoundedPlus2 stroke={2.5} className="size-7" />
                <h1>Simple to-do list</h1>
            </div>
        </header>
    );
}
