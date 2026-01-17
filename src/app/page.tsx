import {
  Recommended,
  NewReleases,
  MoreOn,
  BestSellers,
  BackInStock,
  LoadingBooks,
  ViewMore,
} from "@/components/server/indexServer";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="p-[15px]">
      <Recommended />

      <section className="w-[100%] mt-[15px]">
        <p className="justify-self-center font-garamond text-[30px] pb-[10px]">
          New Releases
        </p>
        <Suspense fallback={<LoadingBooks len={9} />}>
          <NewReleases bookNr={9} />
          <ViewMore href="/new-releases" message="releases" />
        </Suspense>
      </section>

      <MoreOn />

      <section className="w-[100%] mt-[30px]">
        <p className="justify-self-center font-garamond text-[30px] pb-[10px]">
          Best Sellers
        </p>
        <Suspense fallback={<LoadingBooks len={9} />}>
          <BestSellers bookNr={9} />
          <ViewMore href="/best-sellers" message="best sellers" />
        </Suspense>
      </section>

      <section className="w-[100%] mt-[30px]">
        <p className="justify-self-center font-garamond text-[30px] pb-[10px]">
          Back In Stock
        </p>

        <Suspense fallback={<LoadingBooks len={9} />}>
          <BackInStock bookNr={9} />
          <ViewMore href="/back-in-stock" message="in stock" />
        </Suspense>
      </section>
    </main>
  );
}
