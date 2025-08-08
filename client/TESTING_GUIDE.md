# Comprehensive Testing Guide with Vitest

## Overview
This project includes a complete testing suite using **Vitest** with **React Testing Library** for comprehensive component and hook testing.

## Test Setup

### Dependencies Installed
```json
{
  "devDependencies": {
    "vitest": "^2.1.8",
    "@testing-library/react": "^16.1.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^25.0.1"
  }
}
```

### Configuration Files

#### `vitest.config.ts`
```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});
```

#### `src/test/setup.ts`
- Configures testing environment
- Mocks browser APIs (matchMedia, IntersectionObserver, ResizeObserver)
- Sets up environment variables

#### `src/test/test-utils.tsx`
- Custom render function with all providers (Redux, React Query, Search Context)
- Test data and mock utilities
- Re-exports testing library functions

## Test Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests with UI (if @vitest/ui is installed)
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

### 1. Component Tests

#### `MovieCard.test.tsx` - 15 Tests
- ✅ Renders movie information correctly
- ✅ Displays movie poster image
- ✅ Handles click events (click, Enter, Space keys)
- ✅ Handles missing poster URLs
- ✅ Handles long titles and descriptions
- ✅ Displays ratings correctly
- ✅ Accessibility attributes

#### `MovieGrid.test.tsx` - 12 Tests
- ✅ Renders movies correctly
- ✅ Handles movie click events
- ✅ Displays empty state
- ✅ Shows error states
- ✅ Loading indicators
- ✅ End-of-content messages
- ✅ Handles different movie counts

#### `Search.test.tsx` - 15 Tests
- ✅ Renders with default props
- ✅ Handles value changes
- ✅ Icon rendering
- ✅ Special characters
- ✅ Long input handling
- ✅ Focus/blur states
- ✅ Keyboard events

### 2. Hook Tests

#### `useDebounce.test.ts` - 15 Tests
- ✅ Returns initial value immediately
- ✅ Debounces value changes
- ✅ Handles multiple rapid changes
- ✅ Resets timer on changes
- ✅ Different delay values
- ✅ Edge cases (empty, null, undefined)
- ✅ Cleanup on unmount

#### `useInfiniteScroll.test.ts` - 15 Tests
- ✅ Adds/removes event listeners
- ✅ Triggers on scroll near bottom
- ✅ Respects loading states
- ✅ Custom thresholds
- ✅ Initial load detection
- ✅ Resize handling
- ✅ Edge cases

### 3. Context Tests

#### `SearchContext.test.tsx` - 15 Tests
- ✅ Provides initial search value
- ✅ Updates search value
- ✅ Handles input changes
- ✅ Special characters
- ✅ Long search terms
- ✅ Multiple components sharing state
- ✅ Error handling

### 4. API Service Tests

#### `apiService.test.ts` - 25 Tests
- ✅ GET requests with query parameters
- ✅ POST requests with JSON and FormData
- ✅ PUT and DELETE requests
- ✅ Error handling (HTTP errors, network errors)
- ✅ Custom headers
- ✅ URL construction
- ✅ Response parsing

### 5. Integration Tests

#### `Home.test.tsx` - 20 Tests
- ✅ Renders movie grid
- ✅ Loading states
- ✅ Search functionality
- ✅ Error handling
- ✅ Favorites filtering
- ✅ Infinite scroll integration
- ✅ Empty states

## Test Utilities

### Mock Data
```typescript
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Test Movie 1',
    description: 'A test movie description',
    releaseDate: '2023-01-01',
    rating: 8.5,
    genre: 'Action',
    director: 'Test Director',
    posterUrl: 'https://example.com/poster1.jpg',
  },
  // ... more movies
];
```

### Custom Render Function
```typescript
const customRender = (ui: ReactElement, options?: RenderOptions) => 
  render(ui, { wrapper: TestWrapper, ...options });
```

### Provider Setup
```typescript
const TestWrapper = ({ children }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        {children}
      </SearchProvider>
    </QueryClientProvider>
  </Provider>
);
```

## Testing Patterns

### 1. Component Testing
```typescript
describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const mockFn = vi.fn();
    render(<Component onClick={mockFn} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockFn).toHaveBeenCalled();
  });
});
```

### 2. Hook Testing
```typescript
describe('useHookName', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useHookName());
    expect(result.current).toBe(expectedValue);
  });

  it('updates on prop changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useHookName(value),
      { initialProps: { value: 'initial' } }
    );
    
    rerender({ value: 'updated' });
    expect(result.current).toBe('updated');
  });
});
```

### 3. API Testing
```typescript
describe('ApiService', () => {
  it('makes successful request', async () => {
    const promise = ApiService.makeRequest('/test', HTTPMethod.GET);
    mockXHR.onload();
    
    const result = await promise;
    expect(result).toEqual(expectedData);
  });
});
```

## Best Practices

### 1. Test Organization
- Group related tests in `describe` blocks
- Use descriptive test names
- Test one behavior per test
- Arrange-Act-Assert pattern

### 2. Mocking
- Mock external dependencies
- Use `vi.fn()` for function mocks
- Mock browser APIs in setup
- Provide realistic mock data

### 3. Accessibility
- Test keyboard navigation
- Verify ARIA attributes
- Test screen reader compatibility
- Use semantic queries

### 4. Error Handling
- Test error states
- Verify error messages
- Test edge cases
- Handle async errors

## Running Specific Tests

```bash
# Run specific test file
npm test MovieCard.test.tsx

# Run tests matching pattern
npm test -- --grep "MovieCard"

# Run tests in specific directory
npm test src/components/

# Run tests with coverage
npm run test:coverage
```

## Debugging Tests

### 1. Debug Mode
```bash
npm test -- --reporter=verbose
```

### 2. Watch Mode
```bash
npm test -- --watch
```

### 3. UI Mode
```bash
npm run test:ui
```

## Common Issues and Solutions

### 1. Component Not Found
- Check if component is properly exported
- Verify import paths
- Ensure test wrapper includes necessary providers

### 2. Async Test Failures
- Use `waitFor` for async operations
- Mock timers with `vi.useFakeTimers()`
- Handle promises properly

### 3. Event Handling Issues
- Use `fireEvent` or `userEvent` appropriately
- Mock event handlers
- Verify event propagation

### 4. Styling Issues
- Mock CSS modules if needed
- Use `data-testid` for styling tests
- Test responsive behavior

## Coverage Goals

- **Statements**: 90%+
- **Branches**: 85%+
- **Functions**: 90%+
- **Lines**: 90%+

## Continuous Integration

Add to your CI pipeline:
```yaml
- name: Run tests
  run: npm test

- name: Run tests with coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Performance Testing

For performance-critical components:
```typescript
it('renders within performance budget', () => {
  const start = performance.now();
  render(<HeavyComponent />);
  const end = performance.now();
  
  expect(end - start).toBeLessThan(100); // 100ms budget
});
```

This comprehensive testing suite ensures your movie application is robust, maintainable, and reliable across all features including infinite scroll, search functionality, and user interactions.
