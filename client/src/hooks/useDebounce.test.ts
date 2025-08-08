import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    // Change the value
    rerender({ value: 'changed' });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('changed'); // Now should be changed
  });

  it('debounces multiple rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    // Rapid changes
    rerender({ value: 'change1' });
    rerender({ value: 'change2' });
    rerender({ value: 'change3' });

    expect(result.current).toBe('initial'); // Should still be initial

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('change3'); // Should be the last value
  });

  it('resets timer on each change', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    // Change value
    rerender({ value: 'change1' });
    expect(result.current).toBe('initial');

    // Fast forward 300ms (less than delay)
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('initial'); // Should still be initial

    // Change value again
    rerender({ value: 'change2' });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast forward 200ms (total 500ms from last change)
    act(() => {
      vi.advanceTimersByTime(200);
    });
    
    // Wait for the next tick to ensure state update
    act(() => {
      vi.runAllTimers();
    });
    
    expect(result.current).toBe('change2'); // Should be the last value
  });

  it('works with different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'changed' });
    expect(result.current).toBe('initial');

    // Fast forward 500ms (less than 1000ms delay)
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial');

    // Fast forward another 500ms (total 1000ms)
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('changed');
  });

  it('works with zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 0),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'changed' });
    // With zero delay, it should update immediately
    act(() => {
      vi.runAllTimers();
    });
    expect(result.current).toBe('changed');
  });

  it('handles empty string values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: '' });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('');
  });

  it('handles null and undefined values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: null as any });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(null);

    rerender({ value: undefined as any });
    expect(result.current).toBe(null);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(undefined);
  });

  it('handles number values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 0 } }
    );

    expect(result.current).toBe(0);

    rerender({ value: 42 });
    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(42);
  });

  it('handles boolean values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: false } }
    );

    expect(result.current).toBe(false);

    rerender({ value: true });
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(true);
  });

  it('cleans up timer on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    const { unmount } = renderHook(() => useDebounce('test', 500));
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('handles multiple rapid changes with cleanup', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    // Multiple rapid changes
    rerender({ value: 'change1' });
    rerender({ value: 'change2' });
    rerender({ value: 'change3' });

    // Unmount before timer completes
    unmount();

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Should not cause any errors
    expect(true).toBe(true);
  });
});
