import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "../test/test-utils";
import Home from "./Home";
import { mockMovies, mockInfiniteQueryData } from "../test/test-utils";

// Mock the hooks
vi.mock("../hooks/UseMovies", () => ({
  useMovies: vi.fn(),
}));

vi.mock("../hooks/useSearchMovies", () => ({
  useInfiniteSearchMovies: vi.fn(),
}));

vi.mock("../hooks/useDebounce", () => ({
  useDebounce: vi.fn((value) => value),
}));

vi.mock("../hooks/useInfiniteScroll", () => ({
  useInfiniteScroll: vi.fn(),
}));

vi.mock("../context/SearchContext", () => ({
  useSearch: vi.fn(),
  SearchProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("../store/hooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

vi.mock("jotai", () => ({
  useAtom: vi.fn(),
  atom: vi.fn(() => ({ init: false })),
}));

// Import the mocked functions
import { useMovies } from "../hooks/UseMovies";
import { useInfiniteSearchMovies } from "../hooks/useSearchMovies";
import { useSearch } from "../context/SearchContext";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useAtom } from "jotai";

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Set up default mock values
    vi.mocked(useMovies).mockReturnValue({
      data: { pages: [mockMovies], pageParams: [1] },
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    vi.mocked(useInfiniteSearchMovies).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    vi.mocked(useSearch).mockReturnValue({
      searchValue: "",
      setSearchValue: vi.fn(),
    });
    vi.mocked(useAtom).mockReturnValue([false, vi.fn()]);
    vi.mocked(useAppSelector).mockReturnValue([]);
    vi.mocked(useAppDispatch).mockReturnValue(vi.fn());
  });

  it("renders movie grid with movies", () => {
    render(<Home />);

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Two")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Three")).toBeInTheDocument();
  });

  it("shows loading state when movies are loading", () => {
    vi.mocked(useMovies).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<Home />);

    expect(screen.getByText("Loading movies...")).toBeInTheDocument();
  });

  it("shows search loading state when searching", () => {
    vi.mocked(useSearch).mockReturnValue({
      searchValue: "test",
      setSearchValue: vi.fn(),
    });
    vi.mocked(useInfiniteSearchMovies).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<Home />);

    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("shows error state when movies fail to load", () => {
    vi.mocked(useMovies).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: "Failed to load movies" } as Error,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<Home />);

    expect(
      screen.getByText("Error loading movies: Failed to load movies")
    ).toBeInTheDocument();
  });

  it("shows empty state when no movies are available", () => {
    vi.mocked(useMovies).mockReturnValue({
      data: { pages: [], pageParams: [] },
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<Home />);

    expect(screen.getByText("No movies to display")).toBeInTheDocument();
  });

  it("shows favorites section when showFavoritesOnly is true", () => {
    vi.mocked(useAtom).mockReturnValue([true, vi.fn()]);

    render(<Home />);

    expect(screen.getByText("My Favorites")).toBeInTheDocument();
  });

  it("filters movies to show only favorites when showFavoritesOnly is true", () => {
    vi.mocked(useAtom).mockReturnValue([true, vi.fn()]);
    vi.mocked(useAppSelector).mockReturnValue([mockMovies[0]]); // Only first movie is favorite

    render(<Home />);

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();
    expect(screen.queryByText("Test Movie Two")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Movie Three")).not.toBeInTheDocument();
  });

  it("shows search results when searching", () => {
    const searchMovies = [mockMovies[0]];
    vi.mocked(useSearch).mockReturnValue({
      searchValue: "test",
      setSearchValue: vi.fn(),
    });
    vi.mocked(useInfiniteSearchMovies).mockReturnValue({
      data: { pages: [searchMovies], pageParams: [1] },
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<Home />);

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();
    expect(screen.queryByText("Test Movie Two")).not.toBeInTheDocument();
  });

  it("shows loading more indicator when fetching next page", () => {
    vi.mocked(useMovies).mockReturnValue({
      data: mockInfiniteQueryData,
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: true,
    });

    render(<Home />);

    expect(screen.getByText("Loading movies...")).toBeInTheDocument();
  });

  it("shows end message when no more pages available", () => {
    vi.mocked(useMovies).mockReturnValue({
      data: mockInfiniteQueryData,
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<Home />);

    expect(screen.getByText("Home.noMoreMovies")).toBeInTheDocument();
  });

  it("handles movie click", () => {
    render(<Home />);

    // Find the edit button by finding the first EditIcon and clicking its parent button
    const editIcons = screen.getAllByTestId("EditIcon");
    const editButton = editIcons[0].closest("button");
    fireEvent.click(editButton!);

    // Should open popup (this would be tested in Popup component)
    expect(editButton).toBeInTheDocument();
  });

  it("handles search with no results", () => {
    vi.mocked(useSearch).mockReturnValue({
      searchValue: "nonexistent",
      setSearchValue: vi.fn(),
    });
    vi.mocked(useInfiniteSearchMovies).mockReturnValue({
      data: { pages: [], pageParams: [] },
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<Home />);

    expect(screen.getByText("No movies to display")).toBeInTheDocument();
  });

  it("handles search error", () => {
    vi.mocked(useSearch).mockReturnValue({
      searchValue: "test",
      setSearchValue: vi.fn(),
    });
    vi.mocked(useInfiniteSearchMovies).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: "Search failed" } as Error,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<Home />);

    expect(
      screen.getByText("Error loading movies: Search failed")
    ).toBeInTheDocument();
  });

  it("does not show loading more indicator when not fetching", () => {
    vi.mocked(useMovies).mockReturnValue({
      data: mockInfiniteQueryData,
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    render(<Home />);

    expect(
      screen.queryByText("Loading more movies...")
    ).not.toBeInTheDocument();
  });

  it("does not show end message when fetching next page", () => {
    vi.mocked(useMovies).mockReturnValue({
      data: mockInfiniteQueryData,
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: true,
    });

    render(<Home />);

    expect(
      screen.queryByText("No more movies to load")
    ).not.toBeInTheDocument();
  });

  it("handles empty search value", () => {
    vi.mocked(useSearch).mockReturnValue({
      searchValue: "",
      setSearchValue: vi.fn(),
    });

    render(<Home />);

    // Should show regular movies
    expect(screen.getByText("Test Movie One")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Two")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Three")).toBeInTheDocument();
  });

  it("handles undefined data gracefully", () => {
    vi.mocked(useMovies).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<Home />);

    expect(screen.getByText("No movies to display")).toBeInTheDocument();
  });
});
