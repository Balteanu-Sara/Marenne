import { searchBooks, clearResultOverview } from "@/lib/openLibrary";
import { ViewMore } from "@/components/server/indexServer";
import { SearchResult } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function BestSellers() {
  const bestSellersJson = await searchBooks("subject:bestseller");
  const bestSellers: SearchResult[] = await clearResultOverview(
    bestSellersJson
  );

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {bestSellers
          .filter((release, index) => index < 9)
          .map((release) => (
            <Link
              href={`/books/${release.key.replace("/works/", "")}`}
              key={release.key}
              className="flex flex-col items-center m-3 w-[180px]"
            >
              <Image
                src={`https://covers.openlibrary.org/b/id/${release.cover_i}-M.jpg`}
                width={180}
                height={275}
                alt={`Cover book for ${release.title}`}
                className="w-[180px] h-[275px] border-1 border-black border-solid"
              />
              <div className="font-courier text-center">
                <p className="text-clip">{release.title}</p>
                <p>$20.50</p>
              </div>
            </Link>
          ))}
      </div>
      <ViewMore href="/" message="best sellers" />
    </>
  );
}
