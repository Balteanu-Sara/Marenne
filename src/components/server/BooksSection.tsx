import { searchBooks, clearResult } from "@/lib/openLibrary";
import { Book } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function BooksSection() {
  const firstBooksJson = await searchBooks(
    "romance+OR+time+OR+poems&language=eng"
  );
  const firstBooks: Book[] = await clearResult(firstBooksJson);

  return (
    <div className="flex flex-wrap justify-center">
      {firstBooks.map((book) => (
        <Link
          href={`/books/${book.id.replace("/works/", "")}`}
          key={book.id}
          className="flex flex-col items-center m-3 w-[180px]"
        >
          <Image
            src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
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
