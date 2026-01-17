import { BackInStock, LoadingBooks } from "@/components/server/indexServer";
import { Suspense } from "react";

export default function BackInStockPage() {
  return (
    <main className="p-[15px] w-[100%] mt-[15px]">
      <p className="justify-self-center font-garamond text-[30px] pb-[10px]">
        Best Sellers
      </p>
      <Suspense fallback={<LoadingBooks len={20} />}>
        <BackInStock />
      </Suspense>
    </main>
  );
}
