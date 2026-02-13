import Image from "next/image";
import Link from "next/link";
import { clearResultOverview, searchBooksBySubject } from "@/lib/openLibrary";

export default async function MagazinesSection() {
  const magazinesJson = await searchBooksBySubject("magazine");
  const magazines = await clearResultOverview(magazinesJson, 12);

  return (
    <div className="flex flex-wrap justify-center">
      {magazines.map((magazine) => (
        <Link
          href={`/books/${magazine.key.replace("/works/", "")}`}
          key={magazine.key}
          className="flex flex-col items-center m-3 w-[120px] sm:w-[180px]"
        >
          <Image
            src={`https://covers.openlibrary.org/b/id/${magazine.cover_i}-M.jpg`}
            width={120}
            height={195}
            alt={`Cover book for ${magazine.title}`}
            className="w-[120px] h-[195px] sm:w-[180px] sm:h-[275px] border-1 border-black border-solid"
            // className="w-auto h-auto border-1 border-black border-solid"
          />
          <div className="font-courier text-center">
            <p className="text-center text-clip">{magazine.title}</p>
            <p>$20.50</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
