import { searchBooks, clearResult } from "@/lib/openLibrary";
import { ViewMore } from "@/components/server/ViewMore";
import { Book } from "@/types";
import Image from "next/image";

export default async function BestSellers() {
  const bestSellersJson = await searchBooks("subject:bestseller");
  const bestSellers: Book[] = await clearResult(bestSellersJson);

  return (
    <section className="w-[100%] gap-2 mt-[30px]">
      <p className="justify-self-center font-garamond text-[30px] pb-[10px]">
        Best Sellers
      </p>
      <div className="grid grid-cols-3">
        {bestSellers
          .filter((release, index) => index < 9)
          .map((release) => (
            <div key={release.id} className="flex flex-col items-center">
              <Image
                src={`https://covers.openlibrary.org/b/id/${release.cover}-M.jpg`}
                width={180}
                height={275}
                alt={`Cover book for ${release.title}`}
                className="w-auto h-auto"
              />
              <div className="font-courier text-center">
                <p className="text-clip">{release.title}</p>
                <p>$20.50</p>
              </div>
            </div>
          ))}
      </div>
      <ViewMore href="/" message="best sellers" />
    </section>
  );
}
