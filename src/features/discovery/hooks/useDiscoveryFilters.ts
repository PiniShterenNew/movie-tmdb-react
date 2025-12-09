import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type {
    FilterState,
    URLFilterParams,
    TrendOption,
    QuickSortOption,
} from "@/shared/types";
import type { DiscoverParams, SortOptions } from "@/shared/types";
import {
    parseFromURL,
    serializeToURL,
    mergeFiltersToDiscoverParams,
} from "../lib/filterState.utils";

export function useDiscoveryFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filterState = useMemo<FilterState>(() => {
        const urlParams: URLFilterParams = {
            trend: searchParams.get("trend") as TrendOption | undefined,
            sort: searchParams.get("sort") as QuickSortOption | undefined,
            qgenres: searchParams.get("qgenres") as string | undefined,
            genres: searchParams.get("genres") as string | undefined,
            dateFrom: searchParams.get("dateFrom") as string | undefined,
            dateTo: searchParams.get("dateTo") as string | undefined,
            advSort: searchParams.get("advSort") as SortOptions | undefined,
        };
        return parseFromURL(urlParams);
    }, [searchParams]);

    const discoverParams = useMemo<DiscoverParams>(
        () => mergeFiltersToDiscoverParams(filterState),
        [filterState]
    );

    const updateFilter = useCallback((
        key: keyof FilterState,
        value: FilterState[keyof FilterState]
    ) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);

            const updatedState: FilterState = {
                ...filterState,
                [key]: value,
            };

            const urlParams = serializeToURL(updatedState);

            const setParam = (k: string, v: string | undefined) => {
                if (v === undefined || v === null || v === "") {
                    newParams.delete(k);
                } else {
                    newParams.set(k, v);
                }
            };

            setParam('trend', urlParams.trend);
            setParam('sort', urlParams.sort);
            setParam('qgenres', urlParams.qgenres);
            setParam('genres', urlParams.genres);
            setParam('dateFrom', urlParams.dateFrom);
            setParam('dateTo', urlParams.dateTo);
            setParam('advSort', urlParams.advSort);

            return newParams;
        });
    }, [filterState, setSearchParams]);

    const resetFilters = useCallback(() => {
        setSearchParams({}, { replace: true });
    }, [setSearchParams]);

    return {
        filterState,
        updateFilter,
        discoverParams,
        resetFilters,
    };
}