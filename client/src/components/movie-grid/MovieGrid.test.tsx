import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../../test/test-utils";
import MovieGrid from "./MovieGrid";
import { mockMovies } from "../../test/test-utils";

describe("MovieGrid", () => {
  const mockOnMovieClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders movies correctly", () => {
    render(<MovieGrid movies={mockMovies} onMovieClick={mockOnMovieClick} />);

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Two")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Three")).toBeInTheDocument();
  });

  it("calls onMovieClick when a movie edit button is clicked", () => {
    render(<MovieGrid movies={mockMovies} onMovieClick={mockOnMovieClick} />);

    const editButtons = screen.getAllByTestId("EditIcon");
    fireEvent.click(editButtons[0].closest("button")!);

    expect(mockOnMovieClick).toHaveBeenCalledTimes(1);
    expect(mockOnMovieClick).toHaveBeenCalledWith(mockMovies[0]);
  });

  it("displays empty state when no movies are provided", () => {
    render(<MovieGrid movies={[]} onMovieClick={mockOnMovieClick} />);

    expect(screen.getByText("No movies to display")).toBeInTheDocument();
    expect(screen.getByTestId("MovieIcon")).toBeInTheDocument();
  });

  it("displays error state when error is provided", () => {
    const errorMessage = "Failed to load movies";
    render(
      <MovieGrid
        movies={[]}
        onMovieClick={mockOnMovieClick}
        error={errorMessage}
      />
    );

    expect(
      screen.getByText(`Error loading movies: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it("shows loading indicator when isLoadingMore is true", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        isLoadingMore={true}
      />
    );

    expect(screen.getByText("Loading more movies...")).toBeInTheDocument();
  });

  it("shows end message when hasNextPage is false and movies exist", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        hasNextPage={false}
      />
    );

    expect(screen.getByText("No more movies to load")).toBeInTheDocument();
  });

  it("does not show end message when hasNextPage is true", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        hasNextPage={true}
      />
    );

    expect(
      screen.queryByText("No more movies to load")
    ).not.toBeInTheDocument();
  });

  it("does not show end message when isLoadingMore is true", () => {
    render(
      <MovieGrid
        movies={mockMovies}
        onMovieClick={mockOnMovieClick}
        hasNextPage={false}
        isLoadingMore={true}
      />
    );

    expect(
      screen.queryByText("No more movies to load")
    ).not.toBeInTheDocument();
  });

  it("renders correct number of movie cards", () => {
    render(<MovieGrid movies={mockMovies} onMovieClick={mockOnMovieClick} />);

    const movieCards = screen.getAllByText(/Test Movie/);
    expect(movieCards).toHaveLength(mockMovies.length);
  });

  it("handles single movie correctly", () => {
    const singleMovie = [mockMovies[0]];
    render(<MovieGrid movies={singleMovie} onMovieClick={mockOnMovieClick} />);

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();
    expect(screen.queryByText("Test Movie Two")).not.toBeInTheDocument();
  });

  it("handles large number of movies", () => {
    const manyMovies = Array.from({ length: 20 }, (_, index) => ({
      ...mockMovies[0],
      id: index + 1,
      title: `Movie ${index + 1}`,
    }));

    render(<MovieGrid movies={manyMovies} onMovieClick={mockOnMovieClick} />);

    expect(screen.getAllByText("Movie")).toHaveLength(20);
  });

  it("maintains grid layout with different movie counts", () => {
    const { rerender } = render(
      <MovieGrid
        movies={mockMovies.slice(0, 1)}
        onMovieClick={mockOnMovieClick}
      />
    );

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();

    rerender(<MovieGrid movies={mockMovies} onMovieClick={mockOnMovieClick} />);

    expect(screen.getByText("Test Movie One")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Two")).toBeInTheDocument();
    expect(screen.getByText("Test Movie Three")).toBeInTheDocument();
  });
});
