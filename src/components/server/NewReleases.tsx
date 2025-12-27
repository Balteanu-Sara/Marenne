import { searchBooks, clearResult } from "@/lib/openLibrary";
import { ViewMore } from "@/components/server/ViewMore";
import { Book } from "@/types";
import Image from "next/image";

export default async function NewReleases() {
  const newReleasesJson = await searchBooks(
    "and+OR+the+OR+love&first_publish_year=2025"
  );
  const newReleases: Book[] = await clearResult(newReleasesJson);

  return (
    <section className="w-[100%] gap-2 mt-[15px]">
      <p className="justify-self-center font-garamond text-[30px] pb-[10px]">
        New Releases
      </p>
      <div className="grid grid-cols-3">
        {newReleases
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
      <ViewMore href="/" message="releases" />
    </section>
  );
}
