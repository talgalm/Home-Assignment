import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "../test/test-utils";
import { SearchProvider, useSearch } from "./SearchContext";
import { renderHook, act } from "@testing-library/react";

// Test component to use the search context
const TestComponent = () => {
  const { searchValue, setSearchValue } = useSearch();

  return (
    <div>
      <input
        data-testid="search-input"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
      />
      <div data-testid="search-value">{searchValue}</div>
    </div>
  );
};

describe("SearchContext", () => {
  it("provides initial search value", () => {
    const { result } = renderHook(() => useSearch(), {
      wrapper: SearchProvider,
    });

    expect(result.current.searchValue).toBe("");
  });

  it("updates search value when setSearchValue is called", async () => {
    const { result } = renderHook(() => useSearch(), {
      wrapper: SearchProvider,
    });

    act(() => {
      result.current.setSearchValue("test search");
    });

    await waitFor(() => {
      expect(result.current.searchValue).toBe("test search");
    });
  });

  it("renders with SearchProvider", () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-value")).toBeInTheDocument();
  });

  it("updates search value through input", () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const input = screen.getByTestId("search-input");
    const valueDisplay = screen.getByTestId("search-value");

    expect(valueDisplay).toHaveTextContent("");

    fireEvent.change(input, { target: { value: "new search term" } });

    expect(valueDisplay).toHaveTextContent("new search term");
  });

  it("handles empty string input", () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const input = screen.getByTestId("search-input");
    const valueDisplay = screen.getByTestId("search-value");

    fireEvent.change(input, { target: { value: "" } });

    expect(valueDisplay).toHaveTextContent("");
  });

  it("handles special characters in search", () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const input = screen.getByTestId("search-input");
    const valueDisplay = screen.getByTestId("search-value");

    const specialValue = "test@#$%^&*()_+-=[]{}|;:,.<>?";
    fireEvent.change(input, { target: { value: specialValue } });

    expect(valueDisplay).toHaveTextContent(specialValue);
  });

  it("handles very long search terms", () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const input = screen.getByTestId("search-input");
    const valueDisplay = screen.getByTestId("search-value");

    const longValue = "a".repeat(1000);
    fireEvent.change(input, { target: { value: longValue } });

    expect(valueDisplay).toHaveTextContent(longValue);
  });

  it("allows multiple components to share search state", () => {
    const TestComponent2 = () => {
      const { searchValue } = useSearch();
      return <div data-testid="component2">{searchValue}</div>;
    };

    render(
      <SearchProvider>
        <TestComponent />
        <TestComponent2 />
      </SearchProvider>
    );

    const input = screen.getByTestId("search-input");
    const component1 = screen.getByTestId("search-value");
    const component2 = screen.getByTestId("component2");

    fireEvent.change(input, { target: { value: "shared search" } });

    expect(component1).toHaveTextContent("shared search");
    expect(component2).toHaveTextContent("shared search");
  });

  it("throws error when used outside SearchProvider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useSearch());
    }).toThrow("useSearch must be used within a SearchProvider");

    consoleSpy.mockRestore();
  });

  it("handles rapid search value changes", () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const input = screen.getByTestId("search-input");
    const valueDisplay = screen.getByTestId("search-value");

    // Rapid changes
    fireEvent.change(input, { target: { value: "first" } });
    fireEvent.change(input, { target: { value: "second" } });
    fireEvent.change(input, { target: { value: "third" } });

    expect(valueDisplay).toHaveTextContent("third");
  });

  it("handles numeric search values", () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const input = screen.getByTestId("search-input");
    const valueDisplay = screen.getByTestId("search-value");

    fireEvent.change(input, { target: { value: "123" } });

    expect(valueDisplay).toHaveTextContent("123");
  });

  it("handles search value with spaces", () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const input = screen.getByTestId("search-input");
    const valueDisplay = screen.getByTestId("search-value");

    fireEvent.change(input, { target: { value: "search with spaces" } });

    expect(valueDisplay).toHaveTextContent("search with spaces");
  });

  it("handles search value with newlines", () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const input = screen.getByTestId("search-input");
    const valueDisplay = screen.getByTestId("search-value");

    fireEvent.change(input, { target: { value: "search\nwith\nnewlines" } });

    // The text content will be normalized, so we check for the presence of the text
    expect(valueDisplay.textContent).toContain("search");
    expect(valueDisplay.textContent).toContain("with");
    expect(valueDisplay.textContent).toContain("newlines");
  });
});
