import { ErrorMessage } from "@/components/ui";
import { Flame } from "lucide-react";

interface DiscoveryListErrorProps {
    error: unknown;
    refetch: () => void;
}

export const DiscoveryListError: React.FC<DiscoveryListErrorProps> = ({error, refetch}) => {
    return (
        <div className="space-y-8 rtl text-right !mt-5">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <Flame className="w-7 h-7 text-red-500 drop-shadow-[0_0_10px_rgba(255,80,0,0.5)]" />
                    <h2 className="text-3xl font-semibold text-red-400 drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]">
                        סרטים מומלצים
                    </h2>
                </div>
            </div>
            <ErrorMessage error={error} onRetry={refetch} />
        </div>
    );
}