import {
  NewReleases,
  BestSellers,
  BackInStock,
  LoadingBooks,
} from "@/components/server/indexServer";
import {
  RecommendedSection,
  MoreOnSection,
  ViewMore,
} from "@/components/client/indexClient";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="p-[15px]">
      <Suspense fallback={<LoadingBooks len={9} />}>
        <RecommendedSection bookNr={9} />
        <ViewMore href="/recommended" message="recommended books" />
      </Suspense>

      <section className="w-[100%] mt-[30px]">
        <p className="text-center font-garamond text-[30px] pb-[10px]">
          New Releases
        </p>
        <Suspense fallback={<LoadingBooks len={9} />}>
          <NewReleases bookNr={9} />
          <ViewMore href="/new-releases" message="releases" />
        </Suspense>
      </section>

      <section className="w-[100%] mt-[30px]">
        <p className="text-center font-garamond text-[30px] pb-[10px]">
          Best Sellers
        </p>
        <Suspense fallback={<LoadingBooks len={9} />}>
          <BestSellers bookNr={9} />
          <ViewMore href="/best-sellers" message="best sellers" />
        </Suspense>
      </section>

      <Suspense fallback={<LoadingBooks len={9} />}>
        <MoreOnSection bookNr={9} />
        <ViewMore href="/more-on" message="" />
      </Suspense>

      <section className="w-[100%] mt-[30px]">
        <p className="text-center font-garamond text-[30px] pb-[10px]">
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
