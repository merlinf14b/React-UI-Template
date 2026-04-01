import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the home page by default", async () => {
    render(<App />);
    expect(
      await screen.findByRole("heading", { name: "React UI Template" }),
    ).toBeInTheDocument();
  });
});
