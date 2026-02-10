import { MoreOnSection } from "@/components/client/indexClient";
import { LoadingBooks } from "@/components/server/indexServer";
import { Suspense } from "react";

export default function Recommended() {
  return (
    <main className="p-[15px] w-[100%] mt-4 mx-auto max-w-[1050px]">
      <Suspense fallback={<LoadingBooks len={20} />}>
        <MoreOnSection />
      </Suspense>
    </main>
  );
}
