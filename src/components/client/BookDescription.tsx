"use client";
import { useState } from "react";

export default function BookDescription({
  description,
}: {
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col my-10 lg:max-w-[900px] lg:mx-auto">
      <div
        className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-[1500px]" : "max-h-[150px]"
        }`}
      >
        <p className="text-[30px] leading-none">{description}</p>
        {!expanded && (
          <div className="absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      <button
        onClick={() => {
          setExpanded((prev) => !prev);
        }}
        className="self-center mt-2 text-base underline"
      >
        {expanded ? "Show less" : "Read More"}
      </button>
    </div>
  );
}
