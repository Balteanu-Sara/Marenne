import { Suspense } from "react";
import {
  BookDetails,
  LoadingBook,
  LoadingBooks,
  RelatedProducts,
} from "@/components/server/indexServer";
import { searchBooks, clearResult } from "@/lib/openLibrary";

export default async function Book({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bookJson = await searchBooks(`/works/${id}`);
  const book = await clearResult(bookJson);

  return (
    <main className="p-[15px] mx-auto max-w-[1050px]">
      <Suspense fallback={<LoadingBook />}>
        <BookDetails book={book} />
      </Suspense>
      <Suspense fallback={<LoadingBooks len={4} />}>
        <RelatedProducts id={id} subjects={book.subjects} />
      </Suspense>
    </main>
  );
}
