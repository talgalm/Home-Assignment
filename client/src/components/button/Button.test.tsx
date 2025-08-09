import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import GeneralButton from "./Button";
import { getAppTheme } from "../../theme/theme";

const theme = getAppTheme("ltr");

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("GeneralButton", () => {
  it("renders button with text", () => {
    renderWithTheme(<GeneralButton text="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders cancel button variant", () => {
    renderWithTheme(<GeneralButton text="Cancel" variantType="cancel" />);
    const button = screen.getByText("Cancel");
    expect(button).toBeInTheDocument();
    expect(button.closest("button")).toHaveClass("MuiButton-outlined");
  });

  it("renders confirm button variant", () => {
    renderWithTheme(<GeneralButton text="Confirm" variantType="confirm" />);
    const button = screen.getByText("Confirm");
    expect(button).toBeInTheDocument();
    expect(button.closest("button")).toHaveClass("MuiButton-contained");
  });

  it("renders back button variant", () => {
    renderWithTheme(<GeneralButton text="Back" variantType="back" />);
    const button = screen.getByText("Back");
    expect(button).toBeInTheDocument();
    expect(button.closest("button")).toHaveClass("MuiButton-outlined");
  });

  it("renders custom/default button variant", () => {
    renderWithTheme(<GeneralButton text="Custom" variantType="custom" />);
    const button = screen.getByText("Custom");
    expect(button).toBeInTheDocument();
  });

  it("defaults to custom variant when no variantType is provided", () => {
    renderWithTheme(<GeneralButton text="Default" />);
    const button = screen.getByText("Default");
    expect(button).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    renderWithTheme(<GeneralButton text="Click me" onClick={handleClick} />);

    const button = screen.getByText("Click me");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    renderWithTheme(<GeneralButton text="Disabled" disabled />);
    const button = screen.getByText("Disabled");
    expect(button.closest("button")).toBeDisabled();
  });

  it("passes additional props to button", () => {
    renderWithTheme(
      <GeneralButton
        text="Test"
        data-testid="custom-button"
        className="custom-class"
      />
    );

    const button = screen.getByTestId("custom-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("custom-class");
  });

  it("handles size prop", () => {
    renderWithTheme(<GeneralButton text="Large" size="large" />);
    const button = screen.getByText("Large");
    expect(button.closest("button")).toHaveClass("MuiButton-sizeLarge");
  });
});
