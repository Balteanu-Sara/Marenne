import { Suspense } from "react";
import { BookDetails, LoadingBook } from "@/components/server/indexServer";

export default async function Book({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="p-[15px] w-[100%] mt-[15px]">
      <Suspense fallback={<LoadingBook />}>
        <BookDetails id={id} />
      </Suspense>
      <section>
        <div>Related Products</div>
        <div>products</div>
      </section>
    </main>
  );
}
