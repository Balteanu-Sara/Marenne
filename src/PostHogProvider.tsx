"use client";

import posthog from "posthog-js";
import { useEffect, ReactNode } from "react";

export default function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined" && !posthog.__loaded) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: "https://app.posthog.com",
        debug: false,
      });
    }
  }, []);

  return <>{children}</>;
}
