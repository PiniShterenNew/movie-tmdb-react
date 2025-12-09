import { X } from "lucide-react";
import React from "react";
import { cn } from "@/shared/lib";

interface SearchQueryHeaderProps {
    query: string;
    onClear: () => void;
}

export const SearchQueryHeader: React.FC<SearchQueryHeaderProps> = ({ query, onClear }) => {
    return (
        <div className="sticky top-[60px] z-40 bg-[#0e0e0f]/80 backdrop-blur-modern border-b border-[#1a1a1c]">
            <div className="flex items-center gap-2 px-4 py-2">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white font-bold shadow-[0_2px_8px_rgba(255,45,85,0.4)]">
                    <span className="text-sm">חיפוש: {query}</span>
                    <button
                        onClick={onClear}
                        className={cn(
                            "ml-2 hover:bg-white/20 rounded-full p-1",
                            "transition-modern",
                            "flex items-center justify-center"
                        )}
                        aria-label="ביטול חיפוש"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};