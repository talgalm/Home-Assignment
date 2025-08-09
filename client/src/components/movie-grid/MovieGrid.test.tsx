import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "../../test/test-utils";
import MovieGrid from "./MovieGrid";
import { mockMovies } from "../../test/test-utils";

describe("MovieGrid", () => {
  const mockOnMovieClick = vi.fn();
  const mockOnMovieEditClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders movies correctly", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
      />
    );

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Two")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Three")).toBeInTheDocument();
  });

  it("calls onMovieEditClick when a movie edit button is clicked", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
      />
    );

    const editButtons = screen.getAllByTestId("EditIcon");
    fireEvent.click(editButtons[0].closest("button")!);

    expect(mockOnMovieEditClick).toHaveBeenCalledTimes(1);
    expect(mockOnMovieEditClick).toHaveBeenCalledWith(mockMovies[0]);
  });

  it("displays empty state when no movies are provided", () => {
    render(
      <MovieGrid
        movies={[]}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
      />
    );

    expect(screen.getByText("Home.noMovies")).toBeInTheDocument();
    expect(screen.getByTestId("MovieIcon")).toBeInTheDocument();
  });

  it("displays error state when error is provided", () => {
    const errorMessage = "Failed to load movies";
    render(
      <MovieGrid
        movies={[]}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
        error={errorMessage}
      />
    );

    expect(screen.getByText(`Home.error: ${errorMessage}`)).toBeInTheDocument();
  });

  it("shows loading indicator when isLoadingMore is true", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
        isLoadingMore={true}
      />
    );

    expect(screen.getByText("Home.loadMore")).toBeInTheDocument();
  });

  it("shows end message when hasNextPage is false and movies exist", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
        hasNextPage={false}
      />
    );

    expect(screen.getByText("Home.noMovies")).toBeInTheDocument();
  });

  it("does not show end message when hasNextPage is true", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
        hasNextPage={true}
      />
    );

    expect(screen.queryByText("Home.noMovies")).not.toBeInTheDocument();
  });

  it("does not show end message when isLoadingMore is true", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
        hasNextPage={false}
        isLoadingMore={true}
      />
    );

    expect(screen.queryByText("Home.noMovies")).not.toBeInTheDocument();
  });

  it("renders correct number of movie cards", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
      />
    );

    const movieCards = screen.getAllByText(/Test Movie/);
    expect(movieCards).toHaveLength(mockMovies.length);
  });

  it("handles single movie correctly", () => {
    const singleMovie = [mockMovies[0]];
    render(
      <MovieGrid
        movies={singleMovie}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
      />
    );

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();
    expect(screen.queryByText("Test Movie Two")).not.toBeInTheDocument();
  });

  it("handles large number of movies", () => {
    const manyMovies = Array.from({ length: 20 }, (_, index) => ({
      ...mockMovies[0],
      id: index + 1,
      title: `Movie ${index + 1}`,
    }));

    render(
      <MovieGrid
        movies={manyMovies}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
      />
    );

    expect(screen.getAllByText("Movie")).toHaveLength(20);
  });

  it("maintains grid layout with different movie counts", () => {
    const { rerender } = render(
      <MovieGrid
        movies={mockMovies.slice(0, 1)}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
      />
    );

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();

    rerender(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        onMovieEditClick={mockOnMovieEditClick}
      />
    );

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Two")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Three")).toBeInTheDocument();
  });
});
