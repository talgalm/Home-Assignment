import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import GeneralInput from "./Input";
import { getAppTheme } from "../../theme/theme";

const theme = getAppTheme("ltr");

// Mock the language direction hook
vi.mock("../../hooks/useLanguageDirection", () => ({
  useLanguageDirection: () => "ltr",
}));

const TestWrapper = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode;
  defaultValues?: any;
}) => {
  const methods = useForm({ defaultValues });

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>{children}</FormProvider>
    </ThemeProvider>
  );
};

describe("GeneralInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input with placeholder", () => {
    render(
      <TestWrapper>
        <GeneralInput name="test" placeholder="Enter text" />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with default text type", () => {
    render(
      <TestWrapper>
        <GeneralInput name="test" />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders with custom input type", () => {
    render(
      <TestWrapper>
        <GeneralInput name="password" type="password" />
      </TestWrapper>
    );

    const input = screen.getByDisplayValue("");
    expect(input).toHaveAttribute("type", "password");
  });

  it("shows required attribute when required is true", () => {
    render(
      <TestWrapper>
        <GeneralInput name="test" required />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  it("uses default value from defaultValue prop", () => {
    render(
      <TestWrapper>
        <GeneralInput name="test" defaultValue="default text" />
      </TestWrapper>
    );

    expect(screen.getByDisplayValue("default text")).toBeInTheDocument();
  });

  it("uses default value from form provider", () => {
    render(
      <TestWrapper defaultValues={{ test: "form default" }}>
        <GeneralInput name="test" />
      </TestWrapper>
    );

    expect(screen.getByDisplayValue("form default")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    render(
      <TestWrapper>
        <GeneralInput name="test" />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(screen.getByDisplayValue("new value")).toBeInTheDocument();
  });

  it("applies fullWidth prop", () => {
    render(
      <TestWrapper>
        <GeneralInput name="test" />
      </TestWrapper>
    );

    const inputContainer = screen
      .getByRole("textbox")
      .closest(".MuiFormControl-root");
    expect(inputContainer).toHaveClass("MuiFormControl-fullWidth");
  });

  it("applies outlined variant", () => {
    render(
      <TestWrapper>
        <GeneralInput name="test" />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input.closest(".MuiInputBase-root")).toHaveClass(
      "MuiOutlinedInput-root"
    );
  });

  it("sets direction attributes correctly", () => {
    render(
      <TestWrapper>
        <GeneralInput name="test" />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("dir", "ltr");
    expect(input).toHaveStyle({ direction: "ltr", textAlign: "left" });
  });
});
