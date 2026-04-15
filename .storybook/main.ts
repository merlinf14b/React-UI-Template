import type { StorybookConfig } from "@storybook/react-vite";
import type { PluginOption } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  addons: [],
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

    // Workaround: rolldown@1.0.0-rc.13's Linux x64 native binary segfaults
    // when bundling large module graphs (2648+ modules). Disabling tree-shaking
    // and minification avoids the crash. Output is larger but functional, which
    // is acceptable for a Storybook/GitHub Pages deployment.
    config.build = {
      ...config.build,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rolldownOptions: {
        ...(config.build?.rolldownOptions as any),
        treeshake: false,
      },
      minify: false,
    };

    return config;
  },
};

export default config;
