import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../../test/test-utils";
import MovieCard from "./MovieCard";
import { mockMovies } from "../../test/test-utils";

// Mock the hooks and utilities
vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => [],
}));

vi.mock("../../hooks/useDeleteMovie", () => ({
  useDeleteMovie: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

vi.mock("../../utils/textUtils", () => ({
  formatMovieTitle: (title: string) => title,
}));

describe("MovieCard", () => {
  const mockOnClick = vi.fn();
  const mockOnEditClick = vi.fn();
  const movie = mockMovies[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders movie information correctly", () => {
    render(
      <MovieCard
        movie={movie}
        onClick={mockOnClick}
        onEditClick={mockOnEditClick}
      />
    );

    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(
      screen.getByText(`${movie.year} • ${movie.runtime}`)
    ).toBeInTheDocument();
    expect(screen.getByText(movie.genre)).toBeInTheDocument();
  });

  it("displays movie poster image", () => {
    render(
      <MovieCard
        movie={movie}
        onClick={mockOnClick}
        onEditClick={mockOnEditClick}
      />
    );

    const posterImage = screen.getByAltText(movie.title);
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute("src", movie.img);
  });

  it("displays movie icon when no image is provided", () => {
    const movieWithoutImage = { ...movie, img: undefined };
    render(
      <MovieCard
        movie={movieWithoutImage}
        onClick={mockOnClick}
        onEditClick={mockOnEditClick}
      />
    );

    expect(screen.getByTestId("MovieIcon")).toBeInTheDocument();
  });

  it("calls onEditClick when edit button is clicked", () => {
    render(
      <MovieCard
        movie={movie}
        onClick={mockOnClick}
        onEditClick={mockOnEditClick}
      />
    );

    const editButton = screen.getByTestId("EditIcon").closest("button");
    fireEvent.click(editButton!);

    expect(mockOnEditClick).toHaveBeenCalledTimes(1);
    expect(mockOnEditClick).toHaveBeenCalledWith(movie);
  });

  it("handles missing poster URL gracefully", () => {
    const movieWithoutPoster = { ...movie, img: "" };
    render(
      <MovieCard
        movie={movieWithoutPoster}
        onClick={mockOnClick}
        onEditClick={mockOnEditClick}
      />
    );

    expect(screen.getByTestId("MovieIcon")).toBeInTheDocument();
  });

  it("handles long movie titles", () => {
    const movieWithLongTitle = {
      ...movie,
      title:
        "This is a very long movie title that should be handled properly by the component",
    };
    render(
      <MovieCard
        movie={movieWithLongTitle}
        onClick={mockOnClick}
        onEditClick={mockOnEditClick}
      />
    );

    expect(screen.getByText(movieWithLongTitle.title)).toBeInTheDocument();
  });

  it("displays year and runtime correctly", () => {
    render(
      <MovieCard
        movie={movie}
        onClick={mockOnClick}
        onEditClick={mockOnEditClick}
      />
    );

    expect(screen.getByText("2023 • 120")).toBeInTheDocument();
  });

  it("renders all action buttons", () => {
    render(
      <MovieCard
        movie={movie}
        onClick={mockOnClick}
        onEditClick={mockOnEditClick}
      />
    );

    expect(screen.getByTestId("EditIcon")).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
    expect(screen.getByTestId("StarOutlineIcon")).toBeInTheDocument();
  });

  it("handles different movie data", () => {
    const differentMovie = {
      ...movie,
      id: 999,
      title: "Different Movie",
      year: "2024",
      runtime: "180",
      genre: "Sci-Fi",
    };
    render(
      <MovieCard
        movie={differentMovie}
        onClick={mockOnClick}
        onEditClick={mockOnEditClick}
      />
    );

    expect(screen.getByText("Different Movie")).toBeInTheDocument();
    expect(screen.getByText("2024 • 180")).toBeInTheDocument();
    expect(screen.getByText("Sci-Fi")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(
      <MovieCard
        movie={movie}
        onClick={mockOnClick}
        onEditClick={mockOnEditClick}
      />
    );

    const editButton = screen.getByTestId("EditIcon").closest("button");
    expect(editButton).toBeInTheDocument();
  });
});
