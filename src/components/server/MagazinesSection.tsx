import Image from "next/image";
import Link from "next/link";
import { clearResult, searchBooksBySubject } from "@/lib/openLibrary";

export default async function MagazinesSection() {
  const magazinesJson = await searchBooksBySubject("magazine");
  const magazines = await clearResult(magazinesJson, 12);

  return (
    <div className="flex flex-wrap justify-center">
      {magazines.map((magazine) => (
        <Link
          href={`/books/${magazine.id.replace("/works/", "")}`}
          key={magazine.id}
          className="flex flex-col items-center m-3 w-[180px]"
        >
          <Image
            src={`https://covers.openlibrary.org/b/id/${magazine.cover}-M.jpg`}
            width={180}
            height={275}
            alt={`Cover book for ${magazine.title}`}
            className="w-[180px] h-[275px] border-1 border-black border-solid"
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
