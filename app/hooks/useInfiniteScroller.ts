import { useEffect, useRef } from "react";

export const useInfiniteScroller = (
  ref: React.RefObject<HTMLDivElement | null>,
  onIntersect: () => void,
  hasMore: boolean,
) => {
  useEffect(() => {
    const node = ref.current;
    if (!node || !hasMore) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [ref, onIntersect, hasMore]);
};
