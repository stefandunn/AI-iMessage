import { Meta, StoryFn } from "@storybook/react";
import { DeviceProps } from "./Device.types";
import { Device } from "./Device";

export default {
  title: "Device",
  component: Device,
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    fetchMock: {
      // "fetchMock.mocks" is a list of mocked
      // API endpoints.
      mocks: [
        {
          // The "matcher" determines if this
          // mock should respond to the current
          // call to fetch().
          matcher: {
            name: "chatRequest",
            url: "path:/api/chat",
          },
          // If the "matcher" matches the current
          // fetch() call, the fetch response is
          // built using this "response".
          response: {
            status: 200,
            body: "An AI response",
          },
        },
      ],
    },
  },
} satisfies Meta<DeviceProps>;

export const DeviceStory: StoryFn<DeviceProps> = (args) => <Device {...args} />;
DeviceStory.storyName = "Device";
