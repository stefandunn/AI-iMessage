import { Meta, StoryFn } from "@storybook/react";
import { MessageHistoryProps } from "./MessageHistory.types";
import { MessageHistory } from "./MessageHistory";
import { BubbleProps } from "../Bubble/Bubble.types";

export default {
  title: "Message History",
  component: MessageHistory,
  argTypes: {
    messages: {
      table: {
        disable: true,
      },
    },
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
} satisfies Meta<MessageHistoryProps>;

export const MessageHistoryStory: StoryFn<MessageHistoryProps> = () => {
  const messages: BubbleProps[] = [
    { message: "Hi!", timestamp: new Date().getTime() },
    {
      message: "Hello, how are you?",
      sender: true,
      timestamp: new Date().getTime(),
    },
    {
      message: "I'm good, but had a tough day at work. How about yourself?",
      timestamp: new Date().getTime(),
    },
    {
      message:
        "Well, I struck some luck today and won some cash on a scratch card. Fancy a pint down the pub?",
      sender: true,
      timestamp: new Date().getTime(),
    },
    { message: "Oh Wow! Which pub?", timestamp: new Date().getTime() },
    {
      message: "Do you have a favourite?",
      sender: true,
      timestamp: new Date().getTime(),
    },
    {
      message: "No, but we can try the new one that opened up down the road",
      timestamp: new Date().getTime(),
    },
    {
      message: "Sounds like a good idea. Meet you at 7pm",
      sender: true,
      timestamp: new Date().getTime(),
    },
    { message: "", typing: true, timestamp: new Date().getTime() },
  ];
  return <MessageHistory messages={messages} />;
};
MessageHistoryStory.storyName = "Message History";
