"use client";

import Link from "next/link";
import Image from "next/image";
import { searchBooks, clearResultOverview } from "@/lib/openLibrary";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getUserGenres } from "@/lib/auth";
import { SearchResult } from "@/types";

export default function MoreOnSection({ bookNr = 20 }: { bookNr?: number }) {
  const { user } = useAuthContext();
  const [books, setBooks] = useState<SearchResult[] | []>([]);
  const [usedGenre, setUsedGenre] = useState("");

  useEffect(() => {
    if (!user) return;

    const timeout = setTimeout(async () => {
      try {
        const genres = user ? await getUserGenres(user.uid) : [];
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
  }, [user]);

  if (!user) return null;

  if (user) {
    return (
      <section className="w-[100%] mt-[15px]">
        <p className="text-center font-garamond text-[30px] pb-[10px]">
          More on <span className="italic">{usedGenre}</span>
        </p>
        <div className="flex flex-wrap justify-center">
          {books
            .filter((book, index) => index < bookNr)
            .map((book) => (
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
                  <p className="text-clip">{book.title}</p>
                  <p>$20.50</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    );
  }
}
