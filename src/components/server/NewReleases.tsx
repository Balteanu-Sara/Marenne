import { searchBooks, clearResultOverview } from "@/lib/openLibrary";
import { SearchResult } from "@/types";
import Image from "next/image";
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
              <Image
                src={`https://covers.openlibrary.org/b/id/${release.cover_i}-M.jpg`}
                width={120}
                height={195}
                alt={`Cover book for ${release.title}`}
                className="w-[120px] h-[195px] sm:w-[180px] sm:h-[275px] border-1 border-black border-solid"
              />
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
