import {
  MagazinesSection,
  LoadingBooks,
} from "@/components/server/indexServer";
import { Suspense } from "react";

export default function Magazines() {
  return (
    <main className="p-[15px] w-[100%] gap-2 mt-[15px]">
      <p className="justify-self-center font-garamond text-[30px] pb-[10px]">
        Magazines
      </p>
      <Suspense fallback={<LoadingBooks len={9} />}>
        <MagazinesSection />
      </Suspense>
    </main>
  );
}
