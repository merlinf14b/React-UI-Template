import type { Meta, StoryObj } from "@storybook/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Item,
  Breadcrumbs,
  Link,
  Flex,
  Text,
  Heading,
  View,
} from "@adobe/react-spectrum";

const meta = {
  title: "React Spectrum/Navigation",
  component: Tabs,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Tabs>;

export default meta;

export const BasicTabs: StoryObj = {
  render: () => (
    <Tabs aria-label="Project settings">
      <TabList>
        <Item key="general">General</Item>
        <Item key="members">Members</Item>
        <Item key="billing">Billing</Item>
        <Item key="integrations">Integrations</Item>
      </TabList>
      <TabPanels>
        <Item key="general">
          <View padding="size-200">
            <Heading level={3}>General Settings</Heading>
            <Text>
              Configure your project name, description, and visibility settings.
              These settings affect how your project appears to collaborators.
            </Text>
          </View>
        </Item>
        <Item key="members">
          <View padding="size-200">
            <Heading level={3}>Team Members</Heading>
            <Text>
              Manage who has access to this project. You can invite new members,
              change roles, or remove access for existing collaborators.
            </Text>
          </View>
        </Item>
        <Item key="billing">
          <View padding="size-200">
            <Heading level={3}>Billing & Subscription</Heading>
            <Text>
              Review your current plan, update payment methods, and view
              invoices. Upgrade to access premium features.
            </Text>
          </View>
        </Item>
        <Item key="integrations">
          <View padding="size-200">
            <Heading level={3}>Integrations</Heading>
            <Text>
              Connect third-party services like GitHub, Slack, and Jira to
              streamline your workflow and keep everything in sync.
            </Text>
          </View>
        </Item>
      </TabPanels>
    </Tabs>
  ),
};

export const TabsWithDisabledItems: StoryObj = {
  render: () => (
    <Tabs aria-label="Account tabs" disabledKeys={["security", "api"]}>
      <TabList>
        <Item key="profile">Profile</Item>
        <Item key="notifications">Notifications</Item>
        <Item key="security">Security (Upgrade Required)</Item>
        <Item key="api">API Keys (Upgrade Required)</Item>
      </TabList>
      <TabPanels>
        <Item key="profile">
          <View padding="size-200">
            <Heading level={3}>Profile Settings</Heading>
            <Text>Update your avatar, display name, and personal details.</Text>
          </View>
        </Item>
        <Item key="notifications">
          <View padding="size-200">
            <Heading level={3}>Notification Preferences</Heading>
            <Text>
              Choose which email and push notifications you want to receive.
            </Text>
          </View>
        </Item>
        <Item key="security">
          <View padding="size-200">
            <Text>Security settings content.</Text>
          </View>
        </Item>
        <Item key="api">
          <View padding="size-200">
            <Text>API keys content.</Text>
          </View>
        </Item>
      </TabPanels>
    </Tabs>
  ),
};

export const BasicBreadcrumbs: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-400">
      <View>
        <Heading level={3}>Simple Breadcrumbs</Heading>
        <Breadcrumbs>
          <Item key="home">Home</Item>
          <Item key="products">Products</Item>
          <Item key="electronics">Electronics</Item>
          <Item key="laptops">Laptops</Item>
        </Breadcrumbs>
      </View>

      <View>
        <Heading level={3}>Short Breadcrumbs</Heading>
        <Breadcrumbs>
          <Item key="dashboard">Dashboard</Item>
          <Item key="settings">Settings</Item>
        </Breadcrumbs>
      </View>

      <View>
        <Heading level={3}>Breadcrumbs with Many Items</Heading>
        <Breadcrumbs>
          <Item key="root">Organization</Item>
          <Item key="team">Engineering Team</Item>
          <Item key="project">Frontend Project</Item>
          <Item key="repo">react-ui-template</Item>
          <Item key="src">src</Item>
          <Item key="components">components</Item>
          <Item key="button">Button.tsx</Item>
        </Breadcrumbs>
      </View>

      <View>
        <Heading level={3}>Disabled Breadcrumbs</Heading>
        <Breadcrumbs isDisabled>
          <Item key="home">Home</Item>
          <Item key="archive">Archive</Item>
          <Item key="2024">2024</Item>
        </Breadcrumbs>
      </View>

      <View>
        <Heading level={3}>Small Breadcrumbs</Heading>
        <Breadcrumbs size="S">
          <Item key="home">Home</Item>
          <Item key="docs">Documentation</Item>
          <Item key="api">API Reference</Item>
          <Item key="hooks">Hooks</Item>
        </Breadcrumbs>
      </View>

      <View>
        <Heading level={3}>Medium Breadcrumbs</Heading>
        <Breadcrumbs size="M">
          <Item key="home">Home</Item>
          <Item key="docs">Documentation</Item>
          <Item key="api">API Reference</Item>
          <Item key="hooks">Hooks</Item>
        </Breadcrumbs>
      </View>
    </Flex>
  ),
};

export const Links: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-400">
      <View>
        <Heading level={3}>Standalone Links</Heading>
        <Flex direction="column" gap="size-100">
          <Link>
            <a
              href="https://react-spectrum.adobe.com"
              target="_blank"
              rel="noreferrer"
            >
              React Spectrum Documentation
            </a>
          </Link>
          <Link>
            <a
              href="https://github.com/adobe/react-spectrum"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repository
            </a>
          </Link>
          <Link variant="secondary">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Secondary link style
            </a>
          </Link>
        </Flex>
      </View>

      <View>
        <Heading level={3}>Links in Context</Heading>
        <Text>
          Visit the{" "}
          <Link>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              help center
            </a>
          </Link>{" "}
          for more information, or check our{" "}
          <Link>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              FAQ page
            </a>
          </Link>{" "}
          for common questions.
        </Text>
      </View>
    </Flex>
  ),
};

export const CombinedNavigation: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-400">
      <Breadcrumbs>
        <Item key="home">Home</Item>
        <Item key="projects">Projects</Item>
        <Item key="acme">Acme Dashboard</Item>
      </Breadcrumbs>

      <Tabs aria-label="Project views" defaultSelectedKey="overview">
        <TabList>
          <Item key="overview">Overview</Item>
          <Item key="tasks">Tasks</Item>
          <Item key="files">Files</Item>
          <Item key="activity">Activity</Item>
        </TabList>
        <TabPanels>
          <Item key="overview">
            <View padding="size-200">
              <Heading level={3}>Acme Dashboard - Overview</Heading>
              <Text>
                Project status: Active. Last updated 2 hours ago. The project is
                on track with 85% of milestones completed. Next review meeting
                is scheduled for Friday.
              </Text>
            </View>
          </Item>
          <Item key="tasks">
            <View padding="size-200">
              <Heading level={3}>Tasks</Heading>
              <Text>12 open tasks, 3 in progress, 47 completed.</Text>
            </View>
          </Item>
          <Item key="files">
            <View padding="size-200">
              <Heading level={3}>Project Files</Heading>
              <Text>
                23 files uploaded. Total storage used: 1.2 GB of 5 GB.
              </Text>
            </View>
          </Item>
          <Item key="activity">
            <View padding="size-200">
              <Heading level={3}>Recent Activity</Heading>
              <Text>
                Sarah commented on task #42. Mike uploaded design-v3.fig. Alex
                closed issue #108.
              </Text>
            </View>
          </Item>
        </TabPanels>
      </Tabs>
    </Flex>
  ),
};
