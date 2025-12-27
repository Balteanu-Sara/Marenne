import { searchBooks, clearResult } from "@/lib/openLibrary";
import { ViewMore } from "@/components/server/ViewMore";
import { Book } from "@/types";
import Image from "next/image";

export default async function BackInStock() {
  const backInStockJson = await searchBooks("subject:fiction+OR+classic");
  const backInStock: Book[] = await clearResult(backInStockJson);

  return (
    <section className="w-[100%] gap-2 mt-[30px]">
      <p className="justify-self-center font-garamond text-[30px] pb-[10px]">
        Back In Stock
      </p>
      <div className="grid grid-cols-3">
        {backInStock
          .filter((release, index) => index < 9)
          .map((release) => (
            <div key={release.id} className="flex flex-col items-center">
              <Image
                src={`https://covers.openlibrary.org/b/id/${release.cover}-M.jpg`}
                width={180}
                height={275}
                alt={`Cover book for ${release.title}`}
                // className="w-[180px] h-[275px]"
                className="w-auto h-auto"
              />
              <div className="font-courier text-center">
                <p className="text-clip">{release.title}</p>
                <p>$20.50</p>
              </div>
            </div>
          ))}
      </div>
      <ViewMore href="/" message="in stock" />
    </section>
  );
}
