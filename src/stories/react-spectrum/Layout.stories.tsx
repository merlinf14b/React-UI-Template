import type { Meta, StoryObj } from "@storybook/react";
import {
  Flex,
  Grid,
  View,
  Well,
  Divider,
  Text,
  Heading,
} from "@adobe/react-spectrum";

const meta = {
  title: "React Spectrum/Layout",
  component: Flex,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof Flex>;

export const FlexDirections: Story = {
  render: () => (
    <Flex direction="column" gap="size-400">
      <View>
        <Heading level={3}>Row (Default)</Heading>
        <Flex direction="row" gap="size-200">
          <View
            backgroundColor="informative"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Item 1</Text>
          </View>
          <View
            backgroundColor="informative"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Item 2</Text>
          </View>
          <View
            backgroundColor="informative"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Item 3</Text>
          </View>
          <View
            backgroundColor="informative"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Item 4</Text>
          </View>
        </Flex>
      </View>

      <View>
        <Heading level={3}>Column</Heading>
        <Flex direction="column" gap="size-200" maxWidth="size-3000">
          <View
            backgroundColor="positive"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Row A</Text>
          </View>
          <View
            backgroundColor="positive"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Row B</Text>
          </View>
          <View
            backgroundColor="positive"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Row C</Text>
          </View>
        </Flex>
      </View>

      <View>
        <Heading level={3}>Row Reverse</Heading>
        <Flex direction="row-reverse" gap="size-200">
          <View
            backgroundColor="notice"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>First</Text>
          </View>
          <View
            backgroundColor="notice"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Second</Text>
          </View>
          <View
            backgroundColor="notice"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Third</Text>
          </View>
        </Flex>
      </View>
    </Flex>
  ),
};

export const FlexAlignment: Story = {
  render: () => (
    <Flex direction="column" gap="size-400">
      <View>
        <Heading level={3}>Align Items: Center</Heading>
        <Flex gap="size-200" alignItems="center">
          <View
            backgroundColor="informative"
            padding="size-100"
            borderRadius="regular"
          >
            <Text>Small</Text>
          </View>
          <View
            backgroundColor="informative"
            padding="size-400"
            borderRadius="regular"
          >
            <Text>Medium</Text>
          </View>
          <View
            backgroundColor="informative"
            padding="size-800"
            borderRadius="regular"
          >
            <Text>Large</Text>
          </View>
        </Flex>
      </View>

      <View>
        <Heading level={3}>Justify Content: Space Between</Heading>
        <Flex justifyContent="space-between">
          <View
            backgroundColor="positive"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Left</Text>
          </View>
          <View
            backgroundColor="positive"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Center</Text>
          </View>
          <View
            backgroundColor="positive"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Right</Text>
          </View>
        </Flex>
      </View>

      <View>
        <Heading level={3}>Justify Content: Center</Heading>
        <Flex justifyContent="center" gap="size-200">
          <View
            backgroundColor="notice"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Centered A</Text>
          </View>
          <View
            backgroundColor="notice"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Centered B</Text>
          </View>
        </Flex>
      </View>

      <View>
        <Heading level={3}>Justify Content: End</Heading>
        <Flex justifyContent="end" gap="size-200">
          <View
            backgroundColor="negative"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Right A</Text>
          </View>
          <View
            backgroundColor="negative"
            padding="size-200"
            borderRadius="regular"
          >
            <Text>Right B</Text>
          </View>
        </Flex>
      </View>
    </Flex>
  ),
};

export const FlexWrap: Story = {
  render: () => (
    <Flex direction="column" gap="size-300">
      <Heading level={3}>Wrapping Items</Heading>
      <Flex gap="size-200" wrap>
        {[
          "Dashboard",
          "Analytics",
          "Reports",
          "Users",
          "Settings",
          "Integrations",
          "Billing",
          "Support",
          "Documentation",
          "API Keys",
          "Webhooks",
          "Audit Log",
        ].map((label) => (
          <View
            key={label}
            backgroundColor="informative"
            padding="size-200"
            borderRadius="regular"
            minWidth="size-1200"
          >
            <Text>{label}</Text>
          </View>
        ))}
      </Flex>
    </Flex>
  ),
};

export const GridLayout: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-400">
      <View>
        <Heading level={3}>Basic Grid (3 Columns)</Heading>
        <Grid columns={["1fr", "1fr", "1fr"]} rows={["auto"]} gap="size-200">
          <View
            backgroundColor="informative"
            padding="size-300"
            borderRadius="regular"
          >
            <Text>Column 1</Text>
          </View>
          <View
            backgroundColor="informative"
            padding="size-300"
            borderRadius="regular"
          >
            <Text>Column 2</Text>
          </View>
          <View
            backgroundColor="informative"
            padding="size-300"
            borderRadius="regular"
          >
            <Text>Column 3</Text>
          </View>
        </Grid>
      </View>

      <View>
        <Heading level={3}>Sidebar Layout (1fr + 3fr)</Heading>
        <Grid columns={["1fr", "3fr"]} gap="size-200" height="size-2400">
          <View
            backgroundColor="positive"
            padding="size-300"
            borderRadius="regular"
          >
            <Flex direction="column" gap="size-100">
              <Text>Navigation</Text>
              <Text>Dashboard</Text>
              <Text>Projects</Text>
              <Text>Settings</Text>
            </Flex>
          </View>
          <View
            backgroundColor="gray-100"
            padding="size-300"
            borderRadius="regular"
            borderWidth="thin"
            borderColor="dark"
          >
            <Heading level={4}>Main Content Area</Heading>
            <Text>
              This demonstrates a typical sidebar layout using CSS Grid with a
              narrow sidebar and a wider main content area.
            </Text>
          </View>
        </Grid>
      </View>

      <View>
        <Heading level={3}>Dashboard Grid (Mixed Sizes)</Heading>
        <Grid
          columns={["1fr", "1fr", "1fr", "1fr"]}
          rows={["size-1600", "size-2400"]}
          gap="size-200"
        >
          <View
            backgroundColor="informative"
            padding="size-300"
            borderRadius="regular"
          >
            <Heading level={4}>Revenue</Heading>
            <Text>$48,290</Text>
          </View>
          <View
            backgroundColor="positive"
            padding="size-300"
            borderRadius="regular"
          >
            <Heading level={4}>Users</Heading>
            <Text>2,847</Text>
          </View>
          <View
            backgroundColor="notice"
            padding="size-300"
            borderRadius="regular"
          >
            <Heading level={4}>Orders</Heading>
            <Text>1,423</Text>
          </View>
          <View
            backgroundColor="negative"
            padding="size-300"
            borderRadius="regular"
          >
            <Heading level={4}>Issues</Heading>
            <Text>12 open</Text>
          </View>
          <View
            backgroundColor="gray-100"
            padding="size-300"
            borderRadius="regular"
            borderWidth="thin"
            borderColor="dark"
            gridColumnStart="span 2"
          >
            <Heading level={4}>Sales Chart</Heading>
            <Text>
              Chart placeholder showing monthly sales trends over the last
              quarter with a steady 15% month-over-month growth rate.
            </Text>
          </View>
          <View
            backgroundColor="gray-100"
            padding="size-300"
            borderRadius="regular"
            borderWidth="thin"
            borderColor="dark"
            gridColumnStart="span 2"
          >
            <Heading level={4}>Recent Activity</Heading>
            <Text>
              Latest user signups, completed transactions, and support tickets
              from the past 24 hours.
            </Text>
          </View>
        </Grid>
      </View>
    </Flex>
  ),
};

export const ViewAndWell: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-400" maxWidth="size-6000">
      <View>
        <Heading level={3}>View with Background Colors</Heading>
        <Flex direction="column" gap="size-200">
          <View
            backgroundColor="gray-50"
            padding="size-300"
            borderRadius="regular"
          >
            <Text>Default background with padding and border radius</Text>
          </View>
          <View
            backgroundColor="informative"
            padding="size-300"
            borderRadius="regular"
          >
            <Text>Informative background for highlights</Text>
          </View>
          <View
            backgroundColor="positive"
            padding="size-300"
            borderRadius="regular"
          >
            <Text>Positive background for success states</Text>
          </View>
          <View
            backgroundColor="notice"
            padding="size-300"
            borderRadius="regular"
          >
            <Text>Notice background for warnings</Text>
          </View>
          <View
            backgroundColor="negative"
            padding="size-300"
            borderRadius="regular"
          >
            <Text>Negative background for errors</Text>
          </View>
        </Flex>
      </View>

      <View>
        <Heading level={3}>Well Components</Heading>
        <Flex direction="column" gap="size-200">
          <Well>
            This is a basic well component. Wells are used to group related
            content and provide visual separation from the surrounding layout.
            They are useful for displaying secondary information or callouts.
          </Well>
          <Well>
            <Heading level={4}>Configuration Notes</Heading>
            <Text>
              Ensure that all API keys are stored in environment variables.
              Never commit secrets to version control. Use the .env.example file
              as a template for required variables.
            </Text>
          </Well>
        </Flex>
      </View>
    </Flex>
  ),
};

export const DividerExamples: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-400" maxWidth="size-6000">
      <View>
        <Heading level={3}>Horizontal Dividers</Heading>
        <Flex direction="column" gap="size-200">
          <Text>Section 1: Project Overview</Text>
          <Text>
            A comprehensive dashboard for managing your projects, tracking
            progress, and collaborating with your team.
          </Text>
          <Divider />
          <Text>Section 2: Team Members</Text>
          <Text>
            View and manage your team. Assign roles, set permissions, and track
            individual contributions.
          </Text>
          <Divider />
          <Text>Section 3: Timeline</Text>
          <Text>
            Key milestones and deadlines for the current sprint. Review upcoming
            deliverables and adjust schedules as needed.
          </Text>
        </Flex>
      </View>

      <View>
        <Heading level={3}>Divider Sizes</Heading>
        <Flex direction="column" gap="size-200">
          <Text>Small divider (S)</Text>
          <Divider size="S" />
          <Text>Medium divider (M) - Default</Text>
          <Divider size="M" />
          <Text>Large divider (L)</Text>
          <Divider size="L" />
        </Flex>
      </View>

      <View>
        <Heading level={3}>Vertical Dividers</Heading>
        <Flex gap="size-300" alignItems="center" height="size-800">
          <Text>Dashboard</Text>
          <Divider orientation="vertical" />
          <Text>Analytics</Text>
          <Divider orientation="vertical" />
          <Text>Reports</Text>
          <Divider orientation="vertical" />
          <Text>Settings</Text>
        </Flex>
      </View>
    </Flex>
  ),
};

export const ResponsivePattern: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-400">
      <Heading level={3}>Card Layout with Flex Wrap</Heading>
      <Flex gap="size-300" wrap>
        {[
          {
            title: "Frontend",
            desc: "React, TypeScript, Vite, Storybook, Tailwind CSS",
          },
          {
            title: "Backend",
            desc: "Node.js, Express, PostgreSQL, Redis, GraphQL",
          },
          {
            title: "DevOps",
            desc: "Docker, Kubernetes, GitHub Actions, Terraform",
          },
          {
            title: "Testing",
            desc: "Vitest, Playwright, Testing Library, Cypress",
          },
          {
            title: "Monitoring",
            desc: "Datadog, Sentry, PagerDuty, Grafana dashboards",
          },
          {
            title: "Design",
            desc: "Figma, Adobe XD, Sketch, Design tokens, Storybook",
          },
        ].map((card) => (
          <View
            key={card.title}
            borderWidth="thin"
            borderColor="dark"
            borderRadius="regular"
            padding="size-300"
            width="size-3400"
          >
            <Flex direction="column" gap="size-100">
              <Heading level={4}>{card.title}</Heading>
              <Divider size="S" />
              <Text>{card.desc}</Text>
            </Flex>
          </View>
        ))}
      </Flex>
    </Flex>
  ),
};
