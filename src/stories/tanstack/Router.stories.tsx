import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Link,
  Outlet,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import { View, Heading, Text, Flex, Well, Badge } from "@adobe/react-spectrum";

// Cast Link to any to avoid type conflicts with the app's registered router.
// These stories use their own self-contained router via createMemoryHistory.
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
const StoryLink = Link as any;

// ---------------------------------------------------------------------------
// Story: MemoryRouterDemo - full self-contained router
// ---------------------------------------------------------------------------

function RootLayout() {
  return (
    <View padding="size-300">
      <Heading level={2}>TanStack Router Demo</Heading>
      <Text>
        A self-contained router using createMemoryHistory inside Storybook.
      </Text>

      <Flex gap="size-200" marginY="size-200">
        <StoryLink
          to="/"
          style={{
            textDecoration: "none",
            color: "var(--spectrum-accent-color-900)",
          }}
        >
          Home
        </StoryLink>
        <StoryLink
          to="/users"
          style={{
            textDecoration: "none",
            color: "var(--spectrum-accent-color-900)",
          }}
        >
          Users
        </StoryLink>
        <StoryLink
          to="/users/$userId"
          params={{ userId: "42" }}
          style={{
            textDecoration: "none",
            color: "var(--spectrum-accent-color-900)",
          }}
        >
          User #42
        </StoryLink>
        <StoryLink
          to="/search"
          search={{ q: "tanstack", page: 1 }}
          style={{
            textDecoration: "none",
            color: "var(--spectrum-accent-color-900)",
          }}
        >
          Search &quot;tanstack&quot;
        </StoryLink>
      </Flex>

      <View
        borderWidth="thin"
        borderColor="dark"
        borderRadius="medium"
        padding="size-200"
      >
        <Outlet />
      </View>
    </View>
  );
}

function HomePage() {
  return (
    <View>
      <Heading level={3}>Home</Heading>
      <Text>
        Welcome to the home page. Use the navigation links above to explore
        routes.
      </Text>
    </View>
  );
}

function UsersPage() {
  const USERS = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 42, name: "Charlie Brown" },
  ];

  return (
    <View>
      <Heading level={3}>Users</Heading>
      <Flex direction="column" gap="size-100">
        {USERS.map((user) => (
          <Flex key={user.id} alignItems="center" gap="size-100">
            <StoryLink
              to="/users/$userId"
              params={{ userId: String(user.id) }}
              style={{
                textDecoration: "none",
                color: "var(--spectrum-accent-color-900)",
              }}
            >
              {user.name}
            </StoryLink>
            <Badge variant="neutral">ID: {user.id}</Badge>
          </Flex>
        ))}
      </Flex>
    </View>
  );
}

function UserDetailPage() {
  const params: Record<string, string> = useParams({ strict: false });
  const userId = params["userId"] ?? "";

  const knownUsers: Record<string, string> = {
    "1": "Alice Johnson",
    "2": "Bob Smith",
    "42": "Charlie Brown",
  };

  const userName = knownUsers[userId] ?? "Unknown User";

  return (
    <View>
      <Heading level={3}>User Detail</Heading>
      <Well>
        <Flex direction="column" gap="size-50">
          <Text>
            <strong>User ID:</strong> {userId}
          </Text>
          <Text>
            <strong>Name:</strong> {userName}
          </Text>
        </Flex>
      </Well>
      <Text UNSAFE_style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
        This page reads the <code>$userId</code> route parameter via{" "}
        <code>useParams</code>.
      </Text>
    </View>
  );
}

interface SearchParams {
  q: string;
  page: number;
}

function SearchPage() {
  const rawSearch: Record<string, unknown> = useSearch({ strict: false });
  const q = typeof rawSearch["q"] === "string" ? rawSearch["q"] : "";
  const page = typeof rawSearch["page"] === "number" ? rawSearch["page"] : 1;

  return (
    <View>
      <Heading level={3}>Search Results</Heading>
      <Well>
        <Flex direction="column" gap="size-50">
          <Text>
            <strong>Query:</strong> {q}
          </Text>
          <Text>
            <strong>Page:</strong> {page}
          </Text>
        </Flex>
      </Well>
      <Text UNSAFE_style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
        Search parameters are read from the URL via <code>useSearch</code> and
        validated through the route&apos;s <code>validateSearch</code>.
      </Text>
    </View>
  );
}

function buildRouter(initialPath: string) {
  const rootRoute = createRootRoute({ component: RootLayout });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
  });

  const usersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/users",
    component: UsersPage,
  });

  const userDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/users/$userId",
    component: UserDetailPage,
  });

  const searchRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/search",
    component: SearchPage,
    validateSearch: (search: Record<string, unknown>): SearchParams => ({
      q: String(search["q"]),
      page: Number(search["page"]),
    }),
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    usersRoute,
    userDetailRoute,
    searchRoute,
  ]);

  const memoryHistory = createMemoryHistory({ initialEntries: [initialPath] });

  return createRouter({ routeTree, history: memoryHistory });
}

function MemoryRouterDemo() {
  const [router] = useState(() => buildRouter("/"));
  return <RouterProvider router={router} />;
}

function RouteParamsDemo() {
  const [router] = useState(() => buildRouter("/users/42"));
  return <RouterProvider router={router} />;
}

function SearchParamsDemo() {
  const [router] = useState(() => buildRouter("/search?q=react&page=3"));
  return <RouterProvider router={router} />;
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "TanStack/Router",
  parameters: {
    docs: {
      description: {
        component:
          "Showcases @tanstack/react-router in Storybook using createMemoryHistory for self-contained routing demos. Demonstrates nested routes, route parameters, search params, and the Link component.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const MemoryRouter: Story = {
  render: () => <MemoryRouterDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "A complete self-contained router using createMemoryHistory. Navigate between Home, Users list, User detail (route params), and Search (search params).",
      },
    },
  },
};

export const RouteParameters: Story = {
  render: () => <RouteParamsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Starts on the /users/42 route to demonstrate reading $userId via useParams.",
      },
    },
  },
};

export const SearchParameters: Story = {
  render: () => <SearchParamsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Starts on /search?q=react&page=3 to demonstrate validated search parameters via useSearch and validateSearch.",
      },
    },
  },
};
