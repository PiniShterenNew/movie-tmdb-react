// features/discovery/components/QuickGenres.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { QUICK_GENRES } from '@/shared/constants/filter.constants';
import { ErrorMessage } from '@/components/ui/error-states/ErrorMessage';
import { useGenresQuery } from '@/shared/hooks/uesGenresQuery';

interface QuickGenresProps {
    selectedGenres: number[];
    onGenreToggle: (genreId: number) => void;
}

export const QuickGenres: React.FC<QuickGenresProps> = ({
    selectedGenres,
    onGenreToggle,
}) => {
    const { data: allGenres, isLoading, error, refetch } = useGenresQuery();
    
    // Filter only quick genres and sort: selected first, then others
    const quickGenresList = allGenres?.filter(genre => 
        QUICK_GENRES.includes(genre.id as typeof QUICK_GENRES[number])
    ) || [];
    
    // Sort: selected genres first, then unselected
    const sortedGenres = [
        ...quickGenresList.filter(genre => selectedGenres.includes(genre.id)),
        ...quickGenresList.filter(genre => !selectedGenres.includes(genre.id))
    ];
    
    if (isLoading) {
        return <div className="text-gray-400 text-xs">טוען ז'אנרים...</div>;
    }
    
    if (error) {
        return (
            <ErrorMessage 
                error={error} 
                onRetry={refetch} 
            />
        );
    }
    
    return (
        <div className="flex items-center gap-1 flex-nowrap">
            {sortedGenres.map((genre) => {
                const active = selectedGenres.includes(genre.id);
                
                return (
                    <Button
                        key={genre.id}
                        onClick={() => onGenreToggle(genre.id)}
                        className={`
                            rounded-full px-2.5 py-1 text-xs font-medium
                            transition-all duration-200
                            ${active
                                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_2px_8px_rgba(239,68,68,0.3)] hover:from-red-700 hover:to-red-600'
                                : 'bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 text-gray-200 hover:from-white/15 hover:to-white/10 hover:text-white'
                            }
                            hover:scale-[1.02]
                            active:scale-[0.98]
                        `}
                    >
                        {genre.name}
                    </Button>
                );
            })}
        </div>
    );
};