import type { StorybookConfig } from "@storybook/react-vite";
import type { PluginOption } from "vite";
import { resolve } from "path";

function removePlugin(
  plugins: PluginOption[] | undefined,
  name: string,
): PluginOption[] {
  if (!plugins) return [];
  return plugins.flat().filter((plugin) => {
    if (plugin && typeof plugin === "object" && "name" in plugin) {
      return (plugin as { name: string }).name !== name;
    }
    return true;
  });
}

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    // Remove the @react-aria/optimize-locales-plugin — it replaces React
    // locale modules with empty stubs which breaks Storybook's build.
    config.plugins = removePlugin(config.plugins, "locales-plugin");

    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...((config.resolve.alias as Record<string, string> | undefined) ?? {}),
      "@": resolve(__dirname, "../src"),
    };

    return config;
  },
};

export default config;
