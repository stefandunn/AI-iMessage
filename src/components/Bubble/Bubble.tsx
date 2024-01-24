"use client";

import clsx from "clsx";
import { BubbleProps } from "./Bubble.types";
import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const Bubble: React.FC<BubbleProps> = ({
  sender = false,
  message,
  typing,
  className,
  timestamp,
}) => {
  const [deltaX, setDeltaX] = useState<number>(0);
  const [showPeek, setShowPeek] = useState<boolean>(false);
  const [timeAgo, setTimeAgo] = useState<string | undefined>(
    timestamp ? dayjs(timestamp).fromNow() : undefined
  );

  const isPointerDown = useRef<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const timeAgoInterval = useRef<ReturnType<typeof setInterval>>();
  const bubbleRef = useRef<HTMLDivElement>(null);
  const startTouchPos = useRef<{ x: number; y: number } | undefined>(undefined);

  const isTouchDevice = useMemo(() => {
    return typeof window.ontouchstart !== "undefined";
  }, []);

  useEffect(() => {
    if (timeAgoInterval.current) {
      clearInterval(timeAgoInterval.current);
    }
    timeAgoInterval.current = setInterval(() => {
      setTimeAgo(dayjs(timestamp).fromNow());
    }, 500);

    return () => {
      clearInterval(timeAgoInterval.current);
    };
  }, [timestamp]);

  useEffect(() => {
    if (!bubbleRef.current) {
      return;
    }

    const el = bubbleRef.current;
    if (isTouchDevice) {
      const onTouchStart = (e: TouchEvent) => {
        const { clientX: xPos, clientY: yPos } = e.targetTouches[0];
        startTouchPos.current = { x: xPos, y: yPos };
        isPointerDown.current = true;
      };
      const onTouchEnd = () => {
        startTouchPos.current = undefined;
        isPointerDown.current = true;
      };
      const onTouchMove = (e: TouchEvent) => {
        if (!isPointerDown.current) {
          return;
        }
        const { clientX: xPos } = e.targetTouches[0];
        if (!startTouchPos.current) {
          return;
        }
        let lastPos = startTouchPos.current;
        setDeltaX(lastPos.x - xPos);
      };

      el.addEventListener("touchstart", onTouchStart);
      el.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);

      return () => {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
      };
    } else {
      const onMouseDown = (e: MouseEvent) => {
        const { clientX: xPos, clientY: yPos } = e;
        startTouchPos.current = { x: xPos, y: yPos };
        isPointerDown.current = true;
      };
      const onMouseUp = () => {
        startTouchPos.current = undefined;
        isPointerDown.current = false;
      };
      const onMouseMove = (e: MouseEvent) => {
        if (!isPointerDown.current) {
          return;
        }
        const { clientX: xPos } = e;
        if (!startTouchPos.current) {
          return;
        }
        let lastPos = startTouchPos.current;
        setDeltaX((lastPos.x - xPos) * 4);
      };

      el.addEventListener("mousedown", onMouseDown);
      el.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      return () => {
        el.removeEventListener("mousedown", onMouseDown);
        el.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [isTouchDevice]);

  useEffect(() => {
    if (deltaX === 0) {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (deltaX > 100) {
      setShowPeek(sender);
    }
    if (deltaX < -100) {
      setShowPeek(!sender);
    }
    timeoutRef.current = setTimeout(() => {
      setDeltaX(0);
      setShowPeek(false);
    }, 1000);
  }, [deltaX, sender]);

  return (
    <div
      ref={bubbleRef}
      className={clsx(
        sender
          ? "bg-blue-500 rounded-br-none rounded-tl-2xl text-white ml-auto"
          : "bg-slate-200 rounded-tl-none rounded-br-2xl text-black text-opacity-75 mr-auto",
        "rounded-tr-2xl rounded-bl-2xl max-w-[300px] transition-transform duration-700 relative select-none bubble",
        showPeek && !typing && "bg-opacity-75",
        typing ? "p-3" : "px-3 py-2",
        className
      )}
      style={{
        transform: `translateX(${
          showPeek && !typing ? (sender ? "-100px" : "100px") : "0px"
        })`,
      }}
    >
      {!typing ? (
        <div>
          <span>{message}</span>
          {timestamp && (
            <span
              className={clsx(
                "absolute top-0 w-[100px] h-full flex items-center text-slate-500 p-2 text-xs transition-opacity duration-500",
                sender ? "left-full" : "right-full",
                { "opacity-0": !showPeek, "opacity-100": showPeek }
              )}
            >
              {timeAgo}
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className={clsx(
                  "w-3 h-3 rounded-full animate-bounce relative top-[1px]",
                  sender ? "bg-white bg-opacity-75" : "bg-black bg-opacity-15"
                )}
                style={{
                  animationDelay: `${i * 100}ms`,
                  animationDuration: "0.75s",
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};
