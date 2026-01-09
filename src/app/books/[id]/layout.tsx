import { Suspense, ReactNode } from "react";

export default function BookLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div>Loading book...</div>}>{children}</Suspense>;
}
