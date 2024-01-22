import clsx from "clsx";
import { Bubble } from "../Bubble/Bubble";
import { MessageHistoryProps } from "./MessageHistory.types";

export const MessageHistory: React.FC<MessageHistoryProps> = ({
  messages,
  className,
  emptyMessage = "No messages found.",
}) => (
  <div className={clsx("flex gap-3 flex-col overflow-x-hidden", className)}>
    {messages.length > 0 ? (
      <>
        {messages.map((message, i) => (
          <Bubble {...message} key={`${message.typing}-${i}`} />
        ))}
      </>
    ) : (
      <p className="text-gray-400 italic">{emptyMessage}</p>
    )}
  </div>
);
