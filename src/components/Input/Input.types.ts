import { ClassNames } from "@/types/common.types";
import { InputHTMLAttributes } from "react";

export interface InputProps
  extends ClassNames,
    InputHTMLAttributes<HTMLInputElement> {
  onSend?: (text: string) => unknown;
}

export type InputRef = HTMLInputElement | undefined;
