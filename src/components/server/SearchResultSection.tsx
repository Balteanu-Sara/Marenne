import { BookCover } from "@/components/client/indexClient";
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
          <BookCover image={result.cover_i} title={result.title} />
          <div className="font-courier text-center">
            <p className="text-center text-clip">{result.title}</p>
            <p>$20.50</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
