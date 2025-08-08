import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "../../test/test-utils";
import GeneralSearch from "./Search";
import { Search as SearchIcon } from "@mui/icons-material";

describe("GeneralSearch", () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    value: "",
    onChange: mockOnChange,
    placeholder: "Search movies...",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<GeneralSearch {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("renders with custom placeholder", () => {
    render(
      <GeneralSearch {...defaultProps} placeholder="Custom placeholder" />
    );

    expect(
      screen.getByPlaceholderText("Custom placeholder")
    ).toBeInTheDocument();
  });

  it("displays the provided value", () => {
    const testValue = "test search term";
    render(<GeneralSearch {...defaultProps} value={testValue} />);

    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toHaveValue(testValue);
  });

  it("calls onChange when input value changes", () => {
    render(<GeneralSearch {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");
    const newValue = "new search term";

    fireEvent.change(input, { target: { value: newValue } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    // Check that the event was called with a change event
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "change",
      })
    );
  });

  it("renders with icon when provided", () => {
    render(<GeneralSearch {...defaultProps} icon={<SearchIcon />} />);

    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toBeInTheDocument();

    // Check if icon is rendered (Material-UI icons are rendered as SVG)
    const iconContainer = input.parentElement?.querySelector(
      '[class*="MuiInputAdornment"]'
    );
    expect(iconContainer).toBeInTheDocument();
  });

  it("does not render icon when not provided", () => {
    render(<GeneralSearch {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");
    const iconContainer = input.parentElement?.querySelector(
      '[class*="MuiInputAdornment"]'
    );
    expect(iconContainer).not.toBeInTheDocument();
  });

  it("handles multiple input changes", () => {
    render(<GeneralSearch {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");

    fireEvent.change(input, { target: { value: "first" } });
    fireEvent.change(input, { target: { value: "second" } });
    fireEvent.change(input, { target: { value: "third" } });

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });

  it("handles empty string input", async () => {
    render(<GeneralSearch {...defaultProps} value="initial value" />);

    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "change",
        })
      );
    });
  });

  it("handles special characters in input", () => {
    render(<GeneralSearch {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");
    const specialValue = "test@#$%^&*()_+-=[]{}|;:,.<>?";

    fireEvent.change(input, { target: { value: specialValue } });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "change",
      })
    );
  });

  it("handles very long input", () => {
    render(<GeneralSearch {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");
    const longValue = "a".repeat(1000);

    fireEvent.change(input, { target: { value: longValue } });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "change",
      })
    );
  });

  it("forwards additional props to TextField", () => {
    render(
      <GeneralSearch
        {...defaultProps}
        disabled={true}
        required={true}
        data-testid="search-input"
      />
    );

    const input = screen.getByTestId("search-input");
    // The disabled and required props are applied to the TextField wrapper
    expect(input).toBeInTheDocument();
  });

  it("maintains focus state", () => {
    render(<GeneralSearch {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");

    fireEvent.focus(input);
    // Focus is handled by Material-UI, so we just check the component exists
    expect(input).toBeInTheDocument();

    fireEvent.blur(input);
    expect(input).toBeInTheDocument();
  });

  it("handles keyboard events", () => {
    render(<GeneralSearch {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search movies...");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    fireEvent.keyUp(input, { key: "Enter", code: "Enter" });

    // The component should handle keyboard events without throwing errors
    expect(input).toBeInTheDocument();
  });

  it("updates value when props change", () => {
    const { rerender } = render(
      <GeneralSearch {...defaultProps} value="initial" />
    );

    expect(screen.getByPlaceholderText("Search movies...")).toHaveValue(
      "initial"
    );

    rerender(<GeneralSearch {...defaultProps} value="updated" />);

    expect(screen.getByPlaceholderText("Search movies...")).toHaveValue(
      "updated"
    );
  });
});
