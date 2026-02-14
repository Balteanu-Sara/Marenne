import { BookCover } from "@/components/client/indexClient";
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
          <BookCover image={magazine.cover_i} title={magazine.title} />
          <div className="font-courier text-center">
            <p className="text-center text-clip">{magazine.title}</p>
            <p>$20.50</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
