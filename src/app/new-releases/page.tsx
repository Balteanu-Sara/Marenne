import { NewReleases, LoadingBooks } from "@/components/server/indexServer";
import { Suspense } from "react";

export default function NewReleasesPage() {
  return (
    <main className="p-[15px] w-[100%] mt-[15px]">
      <p className="text-center font-garamond text-[30px] pb-[10px]">
        New Releases
      </p>
      <Suspense fallback={<LoadingBooks len={20} />}>
        <NewReleases />
      </Suspense>
    </main>
  );
}
