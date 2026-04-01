import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { View } from "@adobe/react-spectrum";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <View padding="size-200" minHeight="100vh">
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </View>
  );
}
