import {
  Recommended,
  NewReleases,
  MoreOn,
  BestSellers,
  BackInStock,
} from "@/components/server/indexServer";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="p-[15px]">
      <Recommended />
      <Suspense fallback={<div>Loading new releases...</div>}>
        <NewReleases />
      </Suspense>
      <MoreOn />
      <BestSellers />
      <BackInStock />
    </main>
  );
}
