import { ClassNames } from "@/types/common.types";
import { BubbleProps } from "../Bubble/Bubble.types";

export interface MessageHistoryProps extends ClassNames {
  messages: BubbleProps[];
  emptyMessage?: string;
}
