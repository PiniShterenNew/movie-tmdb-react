import { useSearchParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { SearchListGrid } from "@/features/search/components/SearchListGrid";
import { SearchBar } from "@/components/ui/search-bar";

export const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const navigate = useNavigate();

    const handleSearchUpdate = (newQuery: string) => {
        if (newQuery.trim().length > 1) {
            setSearchParams({ query: newQuery.trim() });
        } else if (newQuery.trim().length === 0) {
            navigate("/");
        }
    };

    const handleClear = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-[#0e0e0f] text-[#f2f2f2] font-sans antialiased rtl text-right">
            {/* Search bar with debounce - sticky */}
            <div className="sticky top-[60px] z-40 bg-[#0e0e0f]/80 backdrop-blur-modern border-b border-[#1a1a1c] px-4 py-3">
                <SearchBar 
                    initialValue={query} 
                    onSearchUpdate={handleSearchUpdate}
                    showClearButton={true}
                    onClear={handleClear}
                />
            </div>
            
            {/* Show message if no query, otherwise show results */}
            {query.length <= 1 ? (
                <div className="pt-20 px-4 text-center text-[#f2f2f2]/60">
                    <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium mb-2">התחל לחפש סרטים</p>
                    <p className="text-sm">הקלד את שם הסרט בשדה החיפוש למעלה</p>
                </div>
            ) : (
                <SearchListGrid query={query} />
            )}
        </div>
    );
};
