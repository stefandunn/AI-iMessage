import { Meta, StoryFn } from "@storybook/react";
import { InputProps } from "./Input.types";
import { Input } from "./Input";

export default {
  title: "Input",
  component: Input,
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
} satisfies Meta<InputProps>;

export const InputStory: StoryFn<InputProps> = (args) => <Input {...args} />;
InputStory.storyName = "Input";
