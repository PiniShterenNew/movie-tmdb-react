// features/discovery/components/ui/DiscoveryListLoading.tsx

import { Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const DiscoveryListLoading: React.FC = () => {
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
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {[...Array(10)].map((_, i) => (
                    <Card
                        key={i}
                        className="
                                overflow-hidden bg-[#14151b]/80 backdrop-blur-xl border border-white/5
                                shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-none
                            "
                    >
                        <Skeleton className="h-[256px] w-full bg-white/10 rounded-none" />
                        <CardContent className="p-3 space-y-2">
                            <Skeleton className="h-6 w-3/4 bg-white/10 rounded" />
                            <Skeleton className="h-5 w-16 bg-white/10 rounded-full" />
                            <Skeleton className="h-4 w-1/2 bg-white/10 rounded" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-full bg-white/10 rounded" />
                                <Skeleton className="h-3 w-5/6 bg-white/10 rounded" />
                                <Skeleton className="h-3 w-4/6 bg-white/10 rounded" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </ul>
        </div>
    );
}