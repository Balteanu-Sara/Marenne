import Image from "next/image";
import Link from "next/link";
import { clearResultOverview, searchBooks } from "@/lib/openLibrary";

export default async function SearchResultSection({
  query,
}: {
  query: string;
}) {
  const firstBooksJson = await searchBooks(query);
  const results = await clearResultOverview(firstBooksJson);

  return (
    <div className="flex flex-wrap justify-center">
      {results.map((result) => (
        <Link
          href={`/books/${result.key.replace("/works/", "")}`}
          key={result.key}
          className="flex flex-col items-center m-3 w-[120px] sm:w-[180px]"
        >
          <Image
            src={`https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`}
            width={120}
            height={195}
            alt={`Cover book for ${result.title}`}
            className="w-[120px] h-[195px] sm:w-[180px] sm:h-[275px] border-1 border-black border-solid"
          />
          <div className="font-courier text-center">
            <p className="text-center text-clip">{result.title}</p>
            <p>$20.50</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
