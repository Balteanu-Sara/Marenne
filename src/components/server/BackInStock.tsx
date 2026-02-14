import { searchBooks, clearResultOverview } from "@/lib/openLibrary";
import { SearchResult } from "@/types";
import { BookCover } from "@/components/client/indexClient";
import Link from "next/link";

export default async function BackInStock({
  bookNr = 20,
}: {
  bookNr?: number;
}) {
  const backInStockJson = await searchBooks("subject:fiction+OR+classic");
  const backInStock: SearchResult[] =
    await clearResultOverview(backInStockJson);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {backInStock
          .filter((release, index) => index < bookNr)
          .map((release) => (
            <Link
              href={`/books/${release.key.replace("/works/", "")}`}
              key={release.key}
              className="flex flex-col items-center m-3 w-[120px] sm:w-[180px]"
            >
              <BookCover image={release.cover_i} title={release.title} />
              <div className="font-courier text-center">
                <p className="text-clip">{release.title}</p>
                <p>$20.50</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
