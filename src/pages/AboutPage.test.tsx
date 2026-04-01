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
import { AboutPage } from "./AboutPage";

function renderWithRouter() {
  const rootRoute = createRootRoute({ component: Outlet });
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <div>Home</div>,
  });
  const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: AboutPage,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, aboutRoute]),
    history: createMemoryHistory({ initialEntries: ["/about"] }),
  });

  return render(
    <Provider theme={defaultTheme} colorScheme="light">
      <RouterProvider router={router} />
    </Provider>,
  );
}

describe("AboutPage", () => {
  it("renders the heading", async () => {
    renderWithRouter();
    expect(
      await screen.findByRole("heading", { name: "About" }),
    ).toBeInTheDocument();
  });

  it("renders the back link", async () => {
    renderWithRouter();
    expect(
      await screen.findByRole("link", { name: "Back to home" }),
    ).toBeInTheDocument();
  });

  it("renders description text", async () => {
    renderWithRouter();
    expect(
      await screen.findByText(/reusable React SPA template/),
    ).toBeInTheDocument();
  });
});
