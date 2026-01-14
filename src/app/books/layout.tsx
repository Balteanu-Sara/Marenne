import { Suspense } from "react";

export default function LayoutBook({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback="Loading books">{children}</Suspense>;
}
