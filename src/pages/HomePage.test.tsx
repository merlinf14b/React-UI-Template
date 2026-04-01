import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import {
  createRootRoute,
  createRoute,
  createRouter,
  createMemoryHistory,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import { HomePage } from "./HomePage";

function renderWithRouter() {
  const rootRoute = createRootRoute({ component: Outlet });
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
  });
  const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: () => <div>About</div>,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, aboutRoute]),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });

  return render(
    <Provider theme={defaultTheme} colorScheme="light">
      <RouterProvider router={router} />
    </Provider>,
  );
}

describe("HomePage", () => {
  it("renders the heading", async () => {
    renderWithRouter();
    expect(
      await screen.findByRole("heading", { name: "React UI Template" }),
    ).toBeInTheDocument();
  });

  it("renders the about link", async () => {
    renderWithRouter();
    expect(
      await screen.findByRole("link", { name: "About this template" }),
    ).toBeInTheDocument();
  });

  it("renders welcome text", async () => {
    renderWithRouter();
    expect(
      await screen.findByText(/Welcome to your new React SPA/),
    ).toBeInTheDocument();
  });
});
