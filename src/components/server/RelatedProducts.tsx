import {
  clearResult,
  clearResultOverview,
  searchBooks,
  searchBooksBySubject,
} from "@/lib/openLibrary";
import Image from "next/image";
import Link from "next/link";

export default async function RelatedProducts({ id }: { id: string }) {
  const bookJson = await searchBooks(`/works/${id}`);
  const { subjects } = await clearResult(bookJson);

  const subject = subjects?.reduce((shortest, sub) =>
    sub.length < shortest.length ? sub : shortest
  );
  if (subject) {
    const booksJson = await searchBooksBySubject(
      encodeURIComponent(subject.toLowerCase())
    );
    const books = await clearResultOverview(booksJson, 5);
    const booksFiltered = books.filter((book) => book.key !== `/works/${id}`);
    const relatedBooks =
      booksFiltered.length === 4 ? booksFiltered : booksFiltered.slice(0, 4);

    return (
      <div className="flex flex-wrap justify-center">
        {relatedBooks.map((book) => (
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
}
