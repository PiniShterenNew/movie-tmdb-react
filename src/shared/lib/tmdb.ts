import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useLanguageStore } from "@/shared/store/language.store";

const BASE_URL = "https://api.themoviedb.org/3";

export const tmdb = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
        Accept: "application/json",
    },
    timeout: 10000, // 10 seconds
})

tmdb.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (!import.meta.env.VITE_TMDB_READ_TOKEN) {
            throw new Error("TMDB API token is missing");
        }
        
        // Add language parameter from store to ALL requests
        const language = useLanguageStore.getState().language;
        
        // Ensure params object exists
        if (!config.params) {
            config.params = {};
        }
        
        // Add language parameter (will override if already exists)
        config.params.language = language;
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

tmdb.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        console.error("API Error:", {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: error.message,
        });
        if (error.response?.status === 401) {
            console.error("Unauthorized - Check TMDB API token");
        }

        if (error.response?.status === 429) {
            console.error("Rate Limit exceeded - Too many requests");
        }

        if (error.response?.status === 500) {
            console.error("TMDB Internal Server Error");
        }

        return Promise.reject(error);
    }
);