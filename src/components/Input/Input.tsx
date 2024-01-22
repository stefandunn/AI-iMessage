"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { InputProps, InputRef } from "./Input.types";
import clsx from "clsx";

export const Input = forwardRef<InputRef, InputProps>(
  ({ className, onSend, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [text, setText] = useState<string>("");

    useImperativeHandle(ref, () => inputRef.current || undefined);

    useEffect(() => {
      const el = inputRef.current;
      if (el) {
        const handleInput = (e: KeyboardEvent) => {
          setText((e.currentTarget as HTMLInputElement).value);
        };

        el.addEventListener("keyup", handleInput);

        return () => {
          el.removeEventListener("keyup", handleInput);
        };
      }
    }, []);

    return (
      <div className={clsx("relative", className)}>
        <input
          ref={inputRef}
          {...props}
          className="rounded-2xl px-3 py-1 border border-slate-300 w-full placeholder:italic"
        />
        {text.length > 0 && (
          <button
            type="submit"
            className="h-7 w-7 p-1 flex items-center justify-center rounded-full absolute top-[3px] right-[3px] bg-blue-500 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="h-4 fill-current"
            >
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
