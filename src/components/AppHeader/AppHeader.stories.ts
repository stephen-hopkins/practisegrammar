import { Meta, StoryObj } from "@storybook/react";
import AppHeader from "./AppHeader";

const meta: Meta<typeof AppHeader> = {
  title: "AppHeader",
  component: AppHeader,
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

export const Default: Story = {
  args: {},
};
