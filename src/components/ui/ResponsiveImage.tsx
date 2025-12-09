import React, { useState } from "react";
import {
    TMDB_IMAGE_SIZE_SMALL,
    TMDB_IMAGE_SIZE_MEDIUM,
    TMDB_IMAGE_SIZE_LARGE,
    TMDB_IMAGE_URL,
} from "@/shared/constants";
import { cn } from "@/shared/lib";

interface ResponsiveImageProps {
    src: string;
    alt: string;
    className?: string;
    sizes?: string;
    fallbackSize?: string;
    loading?: "lazy" | "eager";
    onLoad?: () => void;
    onError?: () => void;
}
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    src,
    alt,
    className = "",
    sizes,
    fallbackSize = TMDB_IMAGE_SIZE_MEDIUM,
    loading = "lazy",
    onLoad,
    onError,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <div className={cn("bg-[#1a1a1c] flex justify-center items-center text-[#f2f2f2]/40", className)}>
                אין תמונה
            </div>
        );
    }

    const generateSrcSet = (basePath: string): string => {
        const sizes = [
            { size: TMDB_IMAGE_SIZE_SMALL, width: "200w" },
            { size: TMDB_IMAGE_SIZE_MEDIUM, width: "500w" },
            { size: TMDB_IMAGE_SIZE_LARGE, width: "780w" },
        ];

        return sizes
            .map(({ size, width }) => `${TMDB_IMAGE_URL(basePath, size)} ${width}`)
            .join(", ");
    };

    const defaultSizes = sizes || "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw";
    const fallbackSrc = TMDB_IMAGE_URL(src, fallbackSize);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/* Blur Placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-[#1a1a1c] animate-pulse" />
            )}
            
            {/* Actual Image */}
            <img
                src={fallbackSrc}
                srcSet={generateSrcSet(src)}
                sizes={defaultSizes}
                alt={alt}
                className={cn(
                    "w-full h-full object-cover transition-modern",
                    isLoaded ? "opacity-100" : "opacity-0"
                )}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
};
