import type { Meta, StoryObj } from "@storybook/react";
import { ExampleButton } from "./ExampleButton";

const meta = {
  title: "Components/ExampleButton",
  component: ExampleButton,
  argTypes: {
    variant: {
      control: "select",
      options: ["accent", "primary", "secondary", "negative"],
    },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof ExampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Negative: Story = {
  args: {
    variant: "negative",
    children: "Delete",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    isDisabled: true,
  },
};
