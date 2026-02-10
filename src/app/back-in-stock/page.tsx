import { BackInStock, LoadingBooks } from "@/components/server/indexServer";
import { Suspense } from "react";

export default function BackInStockPage() {
  return (
    <main className="p-[15px] w-[100%] mt-[15px] mx-auto max-w-[1050px]">
      <p className="text-center font-garamond text-[30px] pb-[10px]">
        Back In Stock
      </p>
      <Suspense fallback={<LoadingBooks len={20} />}>
        <BackInStock />
      </Suspense>
    </main>
  );
}
