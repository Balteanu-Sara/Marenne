import Image from "next/image";
import { clearResult, searchBooksBySubject } from "@/lib/openLibrary";

export default async function Genre({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;
  console.log(genre);
  const booksJson = await searchBooksBySubject(genre);
  const books = await clearResult(booksJson, 12);

  return (
    <main className="p-[15px] w-[100%] gap-2 mt-[15px]">
      <p className="justify-self-center font-garamond text-[30px] pb-[10px]">
        {genre !== "lgbt" ? genre[0].toUpperCase() + genre.slice(1) : "LGBT"}
      </p>
      <div className="flex flex-wrap justify-center">
        {books.map((book) => (
          <div
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
          </div>
        ))}
      </div>
    </main>
  );
}
