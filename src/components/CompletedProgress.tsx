import { cn } from "../utils";

type CompletedProgressProps = {
    children: React.ReactNode;
    percentage: number;
};

export default function CompletedProgress({
    children,
    percentage,
}: CompletedProgressProps) {
    return (
        <div className="progress-bar-w">
            <div className="progress-bar">
                <span style={{ width: `${percentage}%` }}></span>
            </div>
            <p className={cn(percentage === 100 && "completed")}>{children}</p>
        </div>
    );
}
