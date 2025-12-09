// features/discovery/components/DiscoveryList.tsx

import React, { useEffect, useRef } from "react";
import { useDiscoveryQuery } from "../hooks/useDiscoveryQuery";
import { type Movie, type DiscoverParams, type PaginatedResponse } from "@/shared/types";
import { DiscoveryListView } from "./ui/DiscoveryListView";
import { DiscoveryListLoading } from "./ui/DiscoveryListLoading";
import { DiscoveryListError } from "./ui/DiscoveryListError";

interface DiscoveryListProps {
    discoverParams: DiscoverParams;
    isPending: boolean;
}

export const DiscoveryList: React.FC<DiscoveryListProps> = ({ discoverParams, isPending }) => {

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useDiscoveryQuery(discoverParams);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    const allMovies = data?.pages.flatMap((page: PaginatedResponse<Movie>) => page.results) || [];

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading && !allMovies.length) {

        return <DiscoveryListLoading />;
    }

    if (isError) {
        return <DiscoveryListError error={error} refetch={refetch} />;
    }

    const showLoadingOverlay = isPending || isFetchingNextPage;

    return (
        <DiscoveryListView
            allMovies={allMovies}
            showLoadingOverlay={showLoadingOverlay}
            refetch={refetch}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            loadMoreRef={loadMoreRef as React.RefObject<HTMLDivElement>}
        />
    )
};

