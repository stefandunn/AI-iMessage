import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../Input/Input";
import { MessageHistory } from "../MessageHistory/MessageHistory";
import { DeviceProps } from "./Device.types";
import { BubbleProps } from "../Bubble/Bubble.types";
import { useChat } from "ai/react";
import clsx from "clsx";

export const Device: React.FC<DeviceProps> = ({ className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const deviceRef = useRef<HTMLFormElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const AITimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const [typing, setTyping] = useState<boolean>(false);
  const [aiTyping, setAITyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<BubbleProps[]>([]);

  const {
    messages: chatMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "/api/chat",
  });

  useEffect(() => {
    if (AITimeoutRef.current) {
      clearTimeout(AITimeoutRef.current);
    }
    if (isLoading) {
      setAITyping(true);
    } else {
      AITimeoutRef.current = setTimeout(() => {
        setAITyping(false);
      }, 1200);
    }
  }, [isLoading]);

  useEffect(() => {
    if (chatMessages.length && !aiTyping && !isLoading) {
      const lastAIMessage = chatMessages.findLast(
        (message) => message.role !== "user"
      );
      if (lastAIMessage) {
        setMessages((messages) => [
          ...messages,
          {
            message: lastAIMessage.content,
            sender: false,
            timestamp: lastAIMessage.createdAt?.getTime(),
          },
        ]);
      }
    }
  }, [chatMessages, aiTyping, isLoading]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (input) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [input]);

  const draftMessageProps: BubbleProps | null = useMemo(
    () =>
      input
        ? {
            message: input,
            sender: true,
            typing,
          }
        : null,
    [input, typing]
  );

  const draftAIMessageProps: BubbleProps | null = useMemo(
    () =>
      aiTyping
        ? {
            message: "",
            sender: false,
            typing: aiTyping,
          }
        : null,
    [aiTyping]
  );

  const sendMessage = () => {
    if (!inputRef.current || !input) {
      return;
    }
    inputRef.current.value = "";
    inputRef.current.dispatchEvent(new Event("keyup"));
    const newMessage: BubbleProps = {
      message: input,
      timestamp: new Date().getTime(),
      sender: true,
      typing: false,
    };
    setMessages((messages) => [...messages, newMessage]);
  };

  const combinedMessages: BubbleProps[] = useMemo(() => {
    return [...messages, draftAIMessageProps, draftMessageProps].filter(
      (message) => message !== null
    ) as BubbleProps[];
  }, [draftMessageProps, draftAIMessageProps, messages]);

  useEffect(() => {
    setTimeout(() => {
      const el = deviceRef.current;
      if (el) {
        const lastBubble =
          el.querySelector<HTMLDivElement>(".bubble:last-child");
        if (!lastBubble) {
          return;
        }
        lastBubble.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [combinedMessages]);

  return (
    <form
      className={clsx(
        "flex-grow h-full flex flex-col rounded-lg shadow-2xl overflow-hidden",
        className
      )}
      onSubmit={(e) => {
        handleSubmit(e);
        sendMessage();
      }}
      ref={deviceRef}
    >
      <div className="p-2 text-center bg-teal-500 text-xl text-white">
        AI Chat
      </div>
      <MessageHistory className="flex-grow p-3" messages={combinedMessages} />
      <Input
        ref={inputRef}
        value={input}
        placeholder="Start typing..."
        onChange={handleInputChange}
        className="m-3"
      />
    </form>
  );
};
