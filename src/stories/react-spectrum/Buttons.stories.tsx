import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  ActionButton,
  ToggleButton,
  Flex,
  Text,
} from "@adobe/react-spectrum";

const meta = {
  title: "React Spectrum/Buttons",
  component: Button,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonVariants: Story = {
  render: () => (
    <Flex direction="column" gap="size-300">
      <Flex gap="size-200" wrap alignItems="center">
        <Button
          variant="accent"
          onPress={() => {
            alert("Pressed!");
          }}
        >
          Accent
        </Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="negative">Negative</Button>
        <Button variant="accent" style="outline">
          Accent Outline
        </Button>
        <Button variant="primary" style="outline">
          Primary Outline
        </Button>
      </Flex>
    </Flex>
  ),
};

export const ButtonStyles: Story = {
  render: () => (
    <Flex direction="column" gap="size-300">
      <Text>Fill (Default)</Text>
      <Flex gap="size-200" alignItems="center">
        <Button variant="accent" style="fill">
          Accent Fill
        </Button>
        <Button variant="primary" style="fill">
          Primary Fill
        </Button>
        <Button variant="secondary" style="fill">
          Secondary Fill
        </Button>
      </Flex>
      <Text>Outline</Text>
      <Flex gap="size-200" alignItems="center">
        <Button variant="accent" style="outline">
          Accent Outline
        </Button>
        <Button variant="primary" style="outline">
          Primary Outline
        </Button>
        <Button variant="secondary" style="outline">
          Secondary Outline
        </Button>
      </Flex>
    </Flex>
  ),
};

export const StaticColorButtons: Story = {
  render: () => (
    <Flex direction="column" gap="size-300">
      <Text>Buttons with different variants for various contexts</Text>
      <Flex gap="size-200" wrap alignItems="center">
        <Button variant="accent">Save Changes</Button>
        <Button variant="primary">Edit Profile</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="negative">Delete Account</Button>
      </Flex>
    </Flex>
  ),
};

export const DisabledButtons: Story = {
  render: () => (
    <Flex gap="size-200" wrap alignItems="center">
      <Button variant="accent" isDisabled>
        Accent Disabled
      </Button>
      <Button variant="primary" isDisabled>
        Primary Disabled
      </Button>
      <Button variant="secondary" isDisabled>
        Secondary Disabled
      </Button>
      <Button variant="negative" isDisabled>
        Negative Disabled
      </Button>
    </Flex>
  ),
};

export const PendingButtons: Story = {
  render: () => (
    <Flex gap="size-200" wrap alignItems="center">
      <Button variant="accent" isPending>
        Saving...
      </Button>
      <Button variant="primary" isPending>
        Loading...
      </Button>
    </Flex>
  ),
};

export const ActionButtons: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-300">
      <Text>Action buttons are used for secondary actions in toolbars.</Text>
      <Flex gap="size-200" wrap alignItems="center">
        <ActionButton>Edit</ActionButton>
        <ActionButton>Copy</ActionButton>
        <ActionButton>Delete</ActionButton>
        <ActionButton isQuiet>Notifications</ActionButton>
        <ActionButton isQuiet>Favorite</ActionButton>
      </Flex>
      <Text>Disabled action buttons</Text>
      <Flex gap="size-200" wrap alignItems="center">
        <ActionButton isDisabled>Edit</ActionButton>
        <ActionButton isDisabled isQuiet>
          Delete
        </ActionButton>
      </Flex>
    </Flex>
  ),
};

export const ToggleButtons: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-300">
      <Text>
        Toggle buttons maintain a selected/unselected state when pressed.
      </Text>
      <Flex gap="size-200" wrap alignItems="center">
        <ToggleButton defaultSelected>Liked</ToggleButton>
        <ToggleButton>Favorite</ToggleButton>
        <ToggleButton>Subscribe</ToggleButton>
      </Flex>
      <Text>Quiet toggle buttons</Text>
      <Flex gap="size-200" wrap alignItems="center">
        <ToggleButton isQuiet defaultSelected>
          Liked
        </ToggleButton>
        <ToggleButton isQuiet>Favorite</ToggleButton>
      </Flex>
      <Text>Emphasized toggle buttons</Text>
      <Flex gap="size-200" wrap alignItems="center">
        <ToggleButton isEmphasized defaultSelected>
          Liked
        </ToggleButton>
        <ToggleButton isEmphasized>Favorite</ToggleButton>
      </Flex>
    </Flex>
  ),
};
