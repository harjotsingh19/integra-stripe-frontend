import { useEffect, useRef, useState, useCallback } from 'react';

export const useScroll = () => {
  const [scrollContainer, setScrollContainer] = useState<any>(null);
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = useCallback(() => {
    if (scrollContainer) {
      const bottom =
        Math.abs(
          scrollContainer.scrollHeight - scrollContainer.clientHeight - scrollContainer.scrollTop
        ) < 1;
      if (bottom) {
        setIsBottom(true);
      } else {
        setIsBottom(false); // Add this line to handle scrolling away from the bottom
      }
    }
  }, [scrollContainer]);

  const setScrollContainerRef = useCallback(
    (ref: { addEventListener: (arg0: string, arg1: () => void) => void }) => {
      if (ref) {
        setScrollContainer(ref);
        ref.addEventListener('scroll', handleScroll);
      }
    },
    [handleScroll]
  );

  useEffect(() => {
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainer, handleScroll]);

  return { scrollContainerRef: setScrollContainerRef, isBottom };
};
