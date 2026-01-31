import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "cinema";
export type ViewMode = "grid" | "list" | "compact";

interface ThemeState {
  theme: Theme;
  viewMode: ViewMode;
  reducedMotion: boolean;
  setTheme: (theme: Theme) => void;
  setViewMode: (mode: ViewMode) => void;
  setReducedMotion: (reduced: boolean) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      viewMode: "grid",
      reducedMotion: false,

      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      setViewMode: (viewMode) => {
        set({ viewMode });
      },

      setReducedMotion: (reducedMotion) => {
        set({ reducedMotion });
      },

      toggleTheme: () => {
        const themes: Theme[] = ["dark", "light", "cinema"];
        const currentIndex = themes.indexOf(get().theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        set({ theme: nextTheme });
        applyTheme(nextTheme);
      },
    }),
    {
      name: "moviehub-theme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light", "cinema");
  root.classList.add(theme);

  // Update body background for different themes
  if (theme === "light") {
    document.body.style.backgroundColor = "#fafafa";
    document.body.style.color = "#1a1a1a";
  } else if (theme === "cinema") {
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#ffffff";
  } else {
    document.body.style.backgroundColor = "#0e0e0f";
    document.body.style.color = "#f2f2f2";
  }
}
