import { Meta, StoryFn } from "@storybook/react";
import { Bubble } from "./Bubble";
import { BubbleProps } from "./Bubble.types";

export default {
  title: "Bubble",
  component: Bubble,
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    fetchMock: {
      mocks: [],
    },
  },
} satisfies Meta<BubbleProps>;

export const BubbleStory: StoryFn<BubbleProps> = (args) => <Bubble {...args} />;
BubbleStory.args = {
  sender: true,
  message: "This is an example message",
  typing: false,
  timestamp: new Date().getTime(),
};
BubbleStory.storyName = "Bubble";
