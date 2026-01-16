"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CopyURLButton() {
  const [message, setMessage] = useState("Copy URL");
  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => setMessage("Copy URL"), 1000);

    return () => {
      clearTimeout(timeout);
    };
  });

  async function copyURL() {
    const url = `${window.location.origin}${pathname}`;
    await navigator.clipboard.writeText(url);

    setMessage("Url Copied");
  }

  return (
    <button onClick={copyURL} className="font-courier uppercase text-sm pt-1">
      {message}
    </button>
  );
}
