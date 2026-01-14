import { searchBooks, clearResult } from "@/lib/openLibrary";
import { ViewMore } from "@/components/server/indexServer";
import { Book } from "@/types";
import Image from "next/image";

export default async function BackInStock() {
  const backInStockJson = await searchBooks("subject:fiction+OR+classic");
  const backInStock: Book[] = await clearResult(backInStockJson);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {backInStock
          .filter((release, index) => index < 9)
          .map((release) => (
            <div
              key={release.id}
              className="flex flex-col items-center m-3 w-[180px]"
            >
              <Image
                src={`https://covers.openlibrary.org/b/id/${release.cover}-M.jpg`}
                width={180}
                height={275}
                alt={`Cover book for ${release.title}`}
                className="w-[180px] h-[275px] border-1 border-black border-solid"
              />
              <div className="font-courier text-center">
                <p className="text-clip">{release.title}</p>
                <p>$20.50</p>
              </div>
            </div>
          ))}
      </div>
      <ViewMore href="/" message="in stock" />
    </>
  );
}
