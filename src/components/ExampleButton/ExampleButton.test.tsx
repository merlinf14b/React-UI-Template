import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { describe, it, expect, vi } from "vitest";
import { ExampleButton } from "./ExampleButton";

function renderWithProvider(ui: React.ReactElement) {
  return render(
    <Provider theme={defaultTheme} colorScheme="light">
      {ui}
    </Provider>,
  );
}

describe("ExampleButton", () => {
  it("renders with children text", () => {
    renderWithProvider(<ExampleButton>Click me</ExampleButton>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("uses accent variant by default", () => {
    renderWithProvider(<ExampleButton>Default</ExampleButton>);
    const button = screen.getByRole("button", { name: "Default" });
    expect(button).toBeInTheDocument();
  });

  it("accepts a custom variant", () => {
    renderWithProvider(
      <ExampleButton variant="primary">Primary</ExampleButton>,
    );
    expect(screen.getByRole("button", { name: "Primary" })).toBeInTheDocument();
  });

  it("calls onPress when clicked", async () => {
    const user = userEvent.setup();
    const handlePress = vi.fn();
    renderWithProvider(
      <ExampleButton onPress={handlePress}>Press me</ExampleButton>,
    );
    await user.click(screen.getByRole("button", { name: "Press me" }));
    expect(handlePress).toHaveBeenCalledOnce();
  });

  it("can be disabled", () => {
    renderWithProvider(<ExampleButton isDisabled>Disabled</ExampleButton>);
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });
});
