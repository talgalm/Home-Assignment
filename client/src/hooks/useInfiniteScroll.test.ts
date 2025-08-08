import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';

describe('useInfiniteScroll', () => {
  const mockOnLoadMore = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    // Mock window properties
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 800,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 1000,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('adds scroll event listener on mount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    
    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
    }));

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('adds resize event listener on mount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    
    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
    }));

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('removes event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
    }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('calls onLoadMore when scrolling near bottom', () => {
    // Mock scroll position near bottom
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 850, // Near bottom (1000 - 800 + 100 threshold)
    });

    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
    }));

    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it('does not call onLoadMore when isLoading is true', () => {
    // Mock scroll position near bottom
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 850,
    });

    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: true,
    }));

    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it('does not call onLoadMore when hasNextPage is false', () => {
    // Mock scroll position near bottom
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 850,
    });

    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: false,
      isLoading: false,
    }));

    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it('uses custom threshold', () => {
    // Mock scroll position that would trigger with custom threshold
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 950, // Would trigger with 200 threshold but not 100
    });

    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
      threshold: 200,
    }));

    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it('handles initial load when page is not tall enough', () => {
    // Mock short page
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 600, // Less than window height (800)
    });

    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
    }));

    // The hook should call onLoadMore after a delay
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it('handles resize events', () => {
    // Mock short page to trigger load more
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 600, // Less than window height (800)
    });

    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
    }));

    // Trigger resize event
    window.dispatchEvent(new Event('resize'));

    // The hook should call onLoadMore after a delay
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it('handles edge case when scrollHeight equals windowHeight', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 800, // Equal to window height
    });

    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
    }));

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it('handles edge case when scrollHeight is less than windowHeight', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 600, // Less than window height
    });

    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
    }));

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it('does not call onLoadMore when page is tall enough and not scrolled', () => {
    // Mock tall page
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 2000, // Taller than window height
    });

    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
    }));

    // Should not call onLoadMore initially
    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  it('handles zero threshold', () => {
    // Mock scroll position at exact bottom
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 200, // Exact bottom (1000 - 800)
    });

    renderHook(() => useInfiniteScroll({
      onLoadMore: mockOnLoadMore,
      hasNextPage: true,
      isLoading: false,
      threshold: 0,
    }));

    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));

    expect(mockOnLoadMore).toHaveBeenCalled();
  });
});
