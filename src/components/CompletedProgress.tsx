import { cn } from "../utils";

type CompletedProgressProps = {
    children: React.ReactNode;
    percentage: number;
    className?: string;
};

export default function CompletedProgress({
    children,
    percentage,
    className,
}: CompletedProgressProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex-1 flex h-2 bg-neutral-800 rounded-full overflow-hidden">
                <span
                    className="bg-green-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                ></span>
            </div>
            <span
                className={cn(
                    "text-xs",
                    percentage === 100
                        ? "text-green-500 transition duration-300"
                        : "text-neutral-500"
                )}
            >
                {children}
            </span>
        </div>
    );
}
