import { BooksSection, LoadingBooks } from "@/components/server/indexServer";
import { Suspense } from "react";

export default function Books() {
  return (
    <main className="p-[15px] w-[100%] gap-2 mt-[15px] mx-auto max-w-[1050px]">
      <p className="text-center font-garamond text-[30px] pb-[10px]">Books</p>
      <Suspense fallback={<LoadingBooks len={9} />}>
        <BooksSection />
      </Suspense>
    </main>
  );
}
