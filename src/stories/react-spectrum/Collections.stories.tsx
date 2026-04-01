import type { Meta, StoryObj } from "@storybook/react";
import {
  ListView,
  Item,
  Section,
  TagGroup,
  MenuTrigger,
  Menu,
  ActionButton,
  Button,
  Flex,
  Heading,
  View,
} from "@adobe/react-spectrum";

const meta = {
  title: "React Spectrum/Collections",
  component: ListView,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ListView>;

export default meta;

export const BasicListView: StoryObj = {
  render: () => (
    <ListView
      aria-label="Project files"
      selectionMode="multiple"
      maxWidth="size-6000"
      height="size-3600"
    >
      <Item key="readme">README.md</Item>
      <Item key="package">package.json</Item>
      <Item key="tsconfig">tsconfig.json</Item>
      <Item key="vite-config">vite.config.ts</Item>
      <Item key="eslint">eslint.config.js</Item>
      <Item key="gitignore">.gitignore</Item>
      <Item key="env-example">.env.example</Item>
      <Item key="dockerfile">Dockerfile</Item>
      <Item key="docker-compose">docker-compose.yml</Item>
    </ListView>
  ),
};

export const ListViewWithDisabledItems: StoryObj = {
  render: () => (
    <ListView
      aria-label="Team members"
      selectionMode="single"
      maxWidth="size-6000"
      height="size-3600"
      disabledKeys={["archived-user", "suspended-user"]}
    >
      <Item key="alice">Alice Johnson - Engineering Lead</Item>
      <Item key="bob">Bob Martinez - Senior Developer</Item>
      <Item key="carol">Carol Chen - Product Designer</Item>
      <Item key="dave">Dave Wilson - Backend Engineer</Item>
      <Item key="archived-user">Eve Brown - Archived Account</Item>
      <Item key="frank">Frank Lee - QA Engineer</Item>
      <Item key="suspended-user">Grace Kim - Suspended Account</Item>
      <Item key="henry">Henry Patel - DevOps Engineer</Item>
    </ListView>
  ),
};

export const ListViewNoneSelection: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-200">
      <Heading level={3}>Read-Only List (No Selection)</Heading>
      <ListView
        aria-label="Recent activity"
        selectionMode="none"
        maxWidth="size-6000"
        height="size-3000"
      >
        <Item key="1">Deployed v2.4.1 to production - 2 hours ago</Item>
        <Item key="2">
          Merged PR #142: Add user authentication - 5 hours ago
        </Item>
        <Item key="3">
          Created branch feature/dashboard-redesign - 1 day ago
        </Item>
        <Item key="4">Closed issue #98: Fix pagination bug - 1 day ago</Item>
        <Item key="5">Published release notes for v2.4.0 - 3 days ago</Item>
        <Item key="6">Updated CI/CD pipeline configuration - 4 days ago</Item>
      </ListView>
    </Flex>
  ),
};

export const BasicTagGroup: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-400" maxWidth="size-6000">
      <View>
        <Heading level={3}>Project Tags</Heading>
        <TagGroup aria-label="Project categories">
          <Item key="react">React</Item>
          <Item key="typescript">TypeScript</Item>
          <Item key="vite">Vite</Item>
          <Item key="storybook">Storybook</Item>
          <Item key="testing">Testing</Item>
          <Item key="ci-cd">CI/CD</Item>
        </TagGroup>
      </View>

      <View>
        <Heading level={3}>Status Labels</Heading>
        <TagGroup aria-label="Issue statuses">
          <Item key="open">Open</Item>
          <Item key="in-progress">In Progress</Item>
          <Item key="review">In Review</Item>
          <Item key="done">Done</Item>
          <Item key="blocked">Blocked</Item>
        </TagGroup>
      </View>

      <View>
        <Heading level={3}>Removable Tags</Heading>
        <TagGroup
          aria-label="Selected filters"
          onRemove={(keys) => {
            void keys;
          }}
        >
          <Item key="priority-high">Priority: High</Item>
          <Item key="assignee-alice">Assignee: Alice</Item>
          <Item key="label-bug">Label: Bug</Item>
          <Item key="milestone-v3">Milestone: v3.0</Item>
        </TagGroup>
      </View>
    </Flex>
  ),
};

export const BasicMenu: StoryObj = {
  render: () => (
    <Flex gap="size-400" wrap>
      <View>
        <Heading level={3}>Simple Menu</Heading>
        <MenuTrigger>
          <ActionButton>File Actions</ActionButton>
          <Menu
            onAction={(key) => {
              alert(`Action: ${String(key)}`);
            }}
          >
            <Item key="new">New File</Item>
            <Item key="open">Open...</Item>
            <Item key="save">Save</Item>
            <Item key="save-as">Save As...</Item>
            <Item key="export">Export</Item>
            <Item key="close">Close</Item>
          </Menu>
        </MenuTrigger>
      </View>

      <View>
        <Heading level={3}>Menu with Disabled Items</Heading>
        <MenuTrigger>
          <ActionButton>Edit</ActionButton>
          <Menu disabledKeys={["paste", "redo"]}>
            <Item key="undo">Undo</Item>
            <Item key="redo">Redo</Item>
            <Item key="cut">Cut</Item>
            <Item key="copy">Copy</Item>
            <Item key="paste">Paste</Item>
            <Item key="select-all">Select All</Item>
          </Menu>
        </MenuTrigger>
      </View>
    </Flex>
  ),
};

export const MenuWithSections: StoryObj = {
  render: () => (
    <Flex gap="size-400" wrap>
      <View>
        <Heading level={3}>Grouped Menu</Heading>
        <MenuTrigger>
          <Button variant="primary">Account Menu</Button>
          <Menu
            onAction={(key) => {
              alert(`Selected: ${String(key)}`);
            }}
          >
            <Section title="Profile">
              <Item key="settings">Account Settings</Item>
              <Item key="preferences">Preferences</Item>
              <Item key="notifications">Notifications</Item>
            </Section>
            <Section title="Organization">
              <Item key="team">Team Management</Item>
              <Item key="billing">Billing & Plans</Item>
              <Item key="integrations">Integrations</Item>
            </Section>
            <Section title="Session">
              <Item key="help">Help & Support</Item>
              <Item key="logout">Sign Out</Item>
            </Section>
          </Menu>
        </MenuTrigger>
      </View>

      <View>
        <Heading level={3}>Selection Menu</Heading>
        <MenuTrigger>
          <ActionButton>Sort By</ActionButton>
          <Menu selectionMode="single" defaultSelectedKeys={["date-desc"]}>
            <Section title="Date">
              <Item key="date-desc">Newest First</Item>
              <Item key="date-asc">Oldest First</Item>
            </Section>
            <Section title="Name">
              <Item key="name-asc">A to Z</Item>
              <Item key="name-desc">Z to A</Item>
            </Section>
            <Section title="Priority">
              <Item key="priority-high">Highest First</Item>
              <Item key="priority-low">Lowest First</Item>
            </Section>
          </Menu>
        </MenuTrigger>
      </View>
    </Flex>
  ),
};

export const MenuMultipleSelection: StoryObj = {
  render: () => (
    <View>
      <Heading level={3}>Multi-Select Filter Menu</Heading>
      <MenuTrigger>
        <ActionButton>Filter Columns</ActionButton>
        <Menu
          selectionMode="multiple"
          defaultSelectedKeys={["name", "status", "date"]}
        >
          <Item key="name">Name</Item>
          <Item key="status">Status</Item>
          <Item key="assignee">Assignee</Item>
          <Item key="priority">Priority</Item>
          <Item key="date">Date Created</Item>
          <Item key="updated">Last Updated</Item>
          <Item key="labels">Labels</Item>
          <Item key="milestone">Milestone</Item>
        </Menu>
      </MenuTrigger>
    </View>
  ),
};
