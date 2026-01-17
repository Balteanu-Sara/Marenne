import { Suspense } from "react";
import {
  LoadingBooks,
  SearchResultSection,
} from "@/components/server/indexServer";

export default async function SearchResult({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;
  const correctedQuery = decodeURIComponent(query);

  return (
    <main className="p-[15px] w-[100%] mt-[15px]">
      <p className="justify-self-center font-garamond text-[30px] pb-[10px]">
        Search Results for &quot;{correctedQuery}&quot;
      </p>

      <Suspense fallback={<LoadingBooks len={4} />}>
        <SearchResultSection query={correctedQuery} />
      </Suspense>
    </main>
  );
}
