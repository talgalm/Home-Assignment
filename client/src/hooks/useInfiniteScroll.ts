import { useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  onLoadMore,
  hasNextPage = true,
  isLoading = false,
  threshold = 100,
}: UseInfiniteScrollOptions) => {
  const handleScroll = useCallback(() => {
    if (isLoading || !hasNextPage) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if we're near the bottom of the page
    if (scrollTop + windowHeight >= documentHeight - threshold) {
      onLoadMore();
    }
  }, [onLoadMore, hasNextPage, isLoading, threshold]);

  // Check if we need to load more content initially (when page is not scrollable)
  const checkInitialLoad = useCallback(() => {
    if (isLoading || !hasNextPage) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // If the document height is less than or equal to window height, 
    // and we have more pages to load, trigger loading
    if (documentHeight <= windowHeight && hasNextPage) {
      onLoadMore();
    }
  }, [onLoadMore, hasNextPage, isLoading]);

  // Handle window resize
  const handleResize = useCallback(() => {
    // Check if we need to load more content after resize
    setTimeout(checkInitialLoad, 100);
  }, [checkInitialLoad]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Check initial load after a short delay to ensure DOM is ready
    const initialCheckTimer = setTimeout(checkInitialLoad, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialCheckTimer);
    };
  }, [handleScroll, handleResize, checkInitialLoad]);

  // Also check when hasNextPage or isLoading changes
  useEffect(() => {
    const timer = setTimeout(checkInitialLoad, 100);
    return () => clearTimeout(timer);
  }, [hasNextPage, isLoading, checkInitialLoad]);
};
