import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback="Loading search results">{children}</Suspense>;
}
