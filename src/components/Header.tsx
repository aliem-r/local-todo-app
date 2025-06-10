import { IconSquareRoundedPlus2 } from "@tabler/icons-react";

export default function Header() {
    return (
        <header>
            <div>
                <IconSquareRoundedPlus2 stroke={2.5} />
                <h1>Simple to-do list</h1>
            </div>
        </header>
    );
}
