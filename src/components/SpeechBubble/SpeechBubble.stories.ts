import { Meta, StoryObj } from "@storybook/react";
import SpeechBubble from "./SpeechBubble";

const meta: Meta<typeof SpeechBubble> = {
  title: "SpeechBubble",
  component: SpeechBubble,
  argTypes: { onClick: { action: "clicked" } },
};

export default meta;

type Story = StoryObj<typeof SpeechBubble>;

export const Original: Story = {
  args: {
    text: "Hello World",
    type: "original",
    show: true,
  },
};

export const Translated: Story = {
  args: {
    ...Original.args,
    type: "translated",
  },
};

export const LongText: Story = {
  args: {
    ...Original.args,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis tellus ut ligula tincidunt pellentesque. Integer sed mi et diam consectetur rutrum. Aenean ut scelerisque est.",
  },
};

export const ShowFalse: Story = {
  args: {
    ...Original.args,
    show: false,
  },
};
