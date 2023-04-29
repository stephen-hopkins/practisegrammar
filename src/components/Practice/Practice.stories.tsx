import { Meta, StoryObj } from "@storybook/react";
import Practice from "./Practice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const meta: Meta<typeof Practice> = {
  title: "Practice",
  component: Practice,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Practice>;

export const Default: Story = {
  args: {},
};
