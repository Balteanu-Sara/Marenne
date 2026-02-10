import { LoadingBooks } from "@/components/server/indexServer";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<LoadingBooks len={4} />}>{children}</Suspense>;
}
