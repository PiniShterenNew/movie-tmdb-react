import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "he" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "he", // Default to Hebrew
      setLanguage: (lang: Language) => set({ language: lang }),
    }),
    {
      name: "moviehub-language", // localStorage key
    }
  )
);
