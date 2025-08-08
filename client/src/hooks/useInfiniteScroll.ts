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

    if (scrollTop + windowHeight >= documentHeight - threshold) {
      onLoadMore();
    }
  }, [onLoadMore, hasNextPage, isLoading, threshold]);

  const checkInitialLoad = useCallback(() => {
    if (isLoading || !hasNextPage) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight <= windowHeight && hasNextPage) {
      onLoadMore();
    }
  }, [onLoadMore, hasNextPage, isLoading]);

  const handleResize = useCallback(() => {
    setTimeout(checkInitialLoad, 100);
  }, [checkInitialLoad]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    const initialCheckTimer = setTimeout(checkInitialLoad, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialCheckTimer);
    };
  }, [handleScroll, handleResize, checkInitialLoad]);

  useEffect(() => {
    const timer = setTimeout(checkInitialLoad, 100);
    return () => clearTimeout(timer);
  }, [hasNextPage, isLoading, checkInitialLoad]);
};
