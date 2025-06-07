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
            <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-neutral-800">
                <span
                    className="h-full rounded-full bg-green-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                ></span>
            </div>
            <span
                className={cn(
                    "text-xs",
                    percentage === 100
                        ? "text-green-500 transition duration-300"
                        : "text-neutral-500",
                )}
            >
                {children}
            </span>
        </div>
    );
}
