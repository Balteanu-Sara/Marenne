import { Suspense } from "react";
import {
  BookDetails,
  LoadingBook,
  LoadingBooks,
  RelatedProducts,
} from "@/components/server/indexServer";

export default async function Book({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="p-[15px] mx-auto max-w-[1050px]">
      <Suspense fallback={<LoadingBook />}>
        <BookDetails id={id} />
      </Suspense>
      <Suspense fallback={<LoadingBooks len={4} />}>
        <RelatedProducts id={id} />
      </Suspense>
    </main>
  );
}
