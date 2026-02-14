"use client";

import Link from "next/link";
import { searchBooks, clearResultOverview } from "@/lib/openLibrary";
import { useAuthContext } from "@/context/AuthContext";
import { LoadingBooks } from "@/components/server/indexServer";
import { BookCover } from "@/components/client/indexClient";
import { useEffect, useState } from "react";
import { SearchResult } from "@/types";

export default function MoreOnSection({ bookNr = 20 }: { bookNr?: number }) {
  const { userProfile } = useAuthContext();
  const [books, setBooks] = useState<SearchResult[] | []>([]);
  const [usedGenre, setUsedGenre] = useState("");

  useEffect(() => {
    if (!userProfile) return;

    const timeout = setTimeout(async () => {
      try {
        const genres = userProfile ? userProfile.selectedGenres : [];
        if (!genres) return;
        setUsedGenre(genres[1]);
        const booksJson = await searchBooks(`subject:${genres[1]}`);
        const booksResult = await clearResultOverview(booksJson);
        setBooks(booksResult);
      } catch (e) {
        console.error(e);
      }
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [userProfile]);

  if (!userProfile) return null;

  if (userProfile) {
    return (
      <section className="w-[100%] mt-[15px]">
        <p className="text-center font-garamond text-[30px] pb-[10px]">
          More on <span className="italic">{usedGenre}</span>
        </p>
        {!books.length && <LoadingBooks len={9} />}
        {books.length && (
          <div className="flex flex-wrap justify-center">
            {books
              .filter((book, index) => index < bookNr)
              .map((book) => (
                <Link
                  href={`/books/${book.key.replace("/works/", "")}`}
                  key={book.key}
                  className="flex flex-col items-center m-3 w-[120px] sm:w-[180px]"
                >
                  <BookCover image={book.cover_i} title={book.title} />
                  <div className="font-courier text-center">
                    <p className="text-clip">{book.title}</p>
                    <p>$20.50</p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </section>
    );
  }
}
