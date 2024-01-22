"use client";

import { Device } from "@/components/Device/Device";

export default function Chat() {
  return (
    <div className="flex-grow flex flex-col justify-start items-stretch p-5">
      <div className="flex-grow flex flex-col justify-start items-stretch w-full max-w-[800px] mx-auto">
        <Device className="flex-grow" />
      </div>
    </div>
  );
}
