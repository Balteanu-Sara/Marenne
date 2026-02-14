import { searchBooks, clearResultOverview } from "@/lib/openLibrary";
import { SearchResult } from "@/types";
import { BookCover } from "@/components/client/indexClient";
import Link from "next/link";

export default async function NewReleases({
  bookNr = 20,
}: {
  bookNr?: number;
}) {
  const newReleasesJson = await searchBooks(
    "and+OR+the+OR+love&first_publish_year=2025",
  );
  const newReleases: SearchResult[] =
    await clearResultOverview(newReleasesJson);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {newReleases
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
