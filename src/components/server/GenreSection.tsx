import Image from "next/image";
import Link from "next/link";
import { clearResultOverview, searchBooksBySubject } from "@/lib/openLibrary";

export default async function GenreSection({ genre }: { genre: string }) {
  const booksJson = await searchBooksBySubject(genre);
  const books = await clearResultOverview(booksJson, 12);

  return (
    <div className="flex flex-wrap justify-center">
      {books.map((book) => (
        <Link
          href={`/books/${book.key.replace("/works/", "")}`}
          key={book.key}
          className="flex flex-col items-center m-3 w-[180px]"
        >
          <Image
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            width={180}
            height={275}
            alt={`Cover book for ${book.title}`}
            className="w-[180px] h-[275px] border-1 border-black border-solid"
            // className="w-auto h-auto border-1 border-black border-solid"
          />
          <div className="font-courier text-center">
            <p className="text-center text-clip">{book.title}</p>
            <p>$20.50</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
