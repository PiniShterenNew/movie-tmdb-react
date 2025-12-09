import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * usePageScrollRestoration
 * שומר ומשחזר מיקום גלילה לעמוד ספציפי (לפי path+search)
 */
export function usePageScrollRestoration(storageKey?: string) {
  const location = useLocation();
  const key = storageKey ?? `${location.pathname}${location.search}`;
  const fullKey = `scroll:${key}`;

  // Restore scroll position BEFORE paint
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(fullKey);
    if (saved != null) {
      const y = Number(saved);
      if (!Number.isNaN(y)) {
        window.scrollTo(0, y);
      }
    }
  }, [fullKey]);

  // Save scroll position in real-time during scrolling
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(fullKey, String(window.scrollY));
    };

    window.addEventListener("scroll", saveScroll);

    return () => {
      window.removeEventListener("scroll", saveScroll);
      // Save scroll position on unmount (when leaving the page)
      sessionStorage.setItem(fullKey, String(window.scrollY));
    };
  }, [fullKey]);
}
