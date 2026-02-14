import { searchBooks, clearResultOverview } from "@/lib/openLibrary";
import { SearchResult } from "@/types";
import { OptionMenu } from "@/components/client/indexClient";
import { BookCover } from "@/components/client/indexClient";
import Link from "next/link";

const genres: string[] = [
  "Architecture",
  "Art",
  "Children",
  "Culture",
  "Design",
  "Erotic",
  "Fashion",
  "Fiction",
  "Food",
  "History",
  "Illustration",
  "LGBT",
  "Music",
  "Nature",
  "Novelty",
  "Philosophy",
  "Photography",
  "Poetry",
  "Politics",
  "Science",
  "Sport",
  "Technology",
];

export default async function BooksSection() {
  const firstBooksJson = await searchBooks(
    "romance+OR+time+OR+poems&language=eng",
  );
  const firstBooks: SearchResult[] = await clearResultOverview(firstBooksJson);

  return (
    <div className="lg:flex lg:flex-row lg:max-w-[70%] lg:ml-[8%] lg:mr-[22%]">
      <div className="hidden lg:flex lg:flex-col lg:mt-3 lg:mb-3 lg:w-1/5 lg:font-garamond ">
        <hr className="hidden lg:block lg:w-[80%] lg:mb-1" />
        <p className="hidden lg:block lg:text-sm lg:font-courier lg:uppercase lg:mb-2">
          Categories
        </p>
        <div className="hidden lg:flex lg:flex-col lg:text-left lg:w-[80%]">
          {genres.map((genre, index) => {
            return (
              <p key={genre + index}>
                <OptionMenu
                  href={`/books/genre/${genre.toLowerCase()}`}
                  style="block h-[33px] text-3xl text-black transition-colors duration-300 hover:text-green"
                  click={undefined}
                  innerText={genre}
                />
              </p>
            );
          })}
        </div>
        <hr className="hidden lg:block lg:w-[80%] lg:mt-4" />
      </div>
      <div className="flex flex-wrap justify-center lg:w-4/5">
        {firstBooks.map((book) => (
          <Link
            href={`/books/${book.key.replace("/works/", "")}`}
            key={book.key}
            className="flex flex-col items-center m-3 w-[120px] sm:w-[180px]"
          >
            <BookCover image={book.cover_i} title={book.title} />
            <div className="font-courier text-center">
              <p className="text-center text-clip">{book.title}</p>
              <p>$20.50</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
