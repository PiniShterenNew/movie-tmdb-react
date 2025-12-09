import { useEffect, useRef, type RefObject } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  enabled?: boolean;
}

/**
 * Custom hook for Intersection Observer API
 * Single Responsibility: Handle intersection observer logic for infinite scroll
 * 
 * @param callback - Function to call when element intersects
 * @param options - IntersectionObserver options
 * @returns Ref object to attach to the target element
 */
export function useIntersectionObserver(
  callback: () => void,
  options: UseIntersectionObserverOptions = {}
): RefObject<HTMLDivElement | null> {
  const {
    threshold = 0.1,
    root = null,
    rootMargin,
    enabled = true,
  } = options;

  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, threshold, root, rootMargin, enabled]);

  return targetRef as RefObject<HTMLDivElement>;
}
