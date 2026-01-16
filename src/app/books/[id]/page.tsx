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
    <main className="p-[15px] gap-2">
      <Suspense fallback={<LoadingBook />}>
        <BookDetails id={id} />
      </Suspense>
      <section className="w-[100%] gap-2 mt-[15px]">
        <div className="justify-self-center font-garamond text-4xl pb-[10px]">
          Related Products
        </div>
        <Suspense fallback={<LoadingBooks len={4} />}>
          <RelatedProducts id={id} />
        </Suspense>
      </section>
    </main>
  );
}
