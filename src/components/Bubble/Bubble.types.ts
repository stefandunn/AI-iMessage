import { ClassNames } from "@/types/common.types";

export interface BubbleProps extends ClassNames {
  message: string;
  sender?: boolean;
  typing?: boolean;
  timestamp?: number;
}
