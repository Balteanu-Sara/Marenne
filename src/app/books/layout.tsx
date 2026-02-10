import { LoadingBooks } from "@/components/server/indexServer";
import { Suspense } from "react";

export default function LayoutBook({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<LoadingBooks len={9} />}>{children}</Suspense>;
}
