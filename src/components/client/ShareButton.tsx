"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShareButton() {
  const [message, setMessage] = useState(
    window.innerWidth >= 1024 ? "Copy URL" : "Share Book",
  );
  const pathname = usePathname();

  console.log(navigator.share);

  useEffect(() => {
    const timeout = setTimeout(
      () => setMessage(window.innerWidth >= 1024 ? "Copy URL" : "Share Book"),
      1000,
    );

    return () => {
      clearTimeout(timeout);
    };
  });

  async function handleShare() {
    if (navigator.share && window.innerWidth < 1024) {
      try {
        await navigator.share({ url: pathname });
        console.log("Shared successfully");
      } catch (err) {
        console.error("Failed share: ", err);
      }
    } else copyURL();
  }

  async function copyURL() {
    const url = `${window.location.origin}${pathname}`;
    await navigator.clipboard.writeText(url);

    setMessage("Url Copied");
  }

  return (
    <button
      onClick={handleShare}
      className="font-courier uppercase text-sm pt-1"
    >
      {message}
    </button>
  );
}
