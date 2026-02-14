/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useStateContext } from "@/context/CurrentStateContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { removeFromWishlist } from "@/lib/auth";
import { useAuthContext } from "@/context/AuthContext";
import { clearResultOverview, searchBooks } from "@/lib/openLibrary";
import { SearchResult } from "@/types";

export default function Wishlist() {
  const { isWishlistOpen, toggleWishlist } = useStateContext();
  const { user, userProfile } = useAuthContext();
  const [books, setBooks] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userProfile || userProfile.wishlist.length === 0) {
      setBooks([]);
      return;
    }

    let finish = false;

    async function fetchWishlist() {
      try {
        const wantedBooks = await Promise.all(
          userProfile!.wishlist.map(async (id) => {
            const wantedBookJson = await searchBooks(id);
            const wantedBook = await clearResultOverview(wantedBookJson, 1);
            const title: string = wantedBook[0].title;
            const author_name: string[] = [];
            if (
              wantedBook[0].author_name &&
              wantedBook[0].author_name.length > 0
            )
              author_name.push(wantedBook[0].author_name[0]);
            const key: string = wantedBook[0].key;
            const cover_i: number = wantedBook[0].cover_i;

            return { author_name, cover_i, key, title };
          }),
        );

        if (!finish) setBooks(wantedBooks);
      } catch (err) {
        console.error("Error at fetching wished books: ", err);
      }
    }

    if (userProfile) fetchWishlist();

    return () => {
      finish = true;
    };
  }, [userProfile]);

  function handleClick(bookId: string) {
    setLoading(true);

    const timeout = setTimeout(async () => {
      if (user) await removeFromWishlist(user.uid, bookId);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }

  if (!userProfile) return null;

  return (
    <>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-5" onClick={toggleWishlist} />
      )}
      <div
        className={`flex flex-col text-white text-lg ${books.length ? "justify-between" : "justify-center"} ${loading ? "pointer-events-none" : ""} fixed z-10 bg-red overflow-y-auto p-[30px] top-0 bottom-0 w-[80%] lg:w-[35%] transform transition-[left] duration-500
    ${isWishlistOpen ? "left-[20%] lg:left-[65%]" : "left-[100%]"}
        }`}
      >
        {books.length === 0 && (
          <p className="font-courier self-center">Your wishlist is empty!</p>
        )}

        {books.length > 0 && (
          <div className="overflow-x-hidden overflow-y-auto scrollbar-thin border-t-white border-t-[1px] border-b-white border-b-[1px]">
            {books.map((book) => {
              return (
                <div
                  className="flex flex-row justify-between font-courier text-sm py-5 border-b-white border-b-[1px]"
                  key={book.key}
                >
                  <Link
                    href={`/books/${book.key.replace("/works/", "")}`}
                    onClick={toggleWishlist}
                    className="w-1/4"
                  >
                    <Image
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      width={100}
                      height={160}
                      alt={`Cover book for ${book.title}`}
                      className="w-auto h-auto max-h-[160px] mx-auto"
                    />
                  </Link>
                  <div className="flex flex-col gap-2 w-2/4 px-3">
                    <p>{book.author_name}</p>
                    <Link
                      href={`/books/${book.key.replace("/works/", "")}`}
                      onClick={toggleWishlist}
                    >
                      <strong>{book.title}</strong>
                    </Link>
                    <p>$12,5</p>
                  </div>
                  <button
                    className="uppercase w-1/4 h-4 transition-colors duration-300 hover:text-yellow"
                    onClick={() => {
                      handleClick(book.key);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {loading && (
          <div className="absolute z-15 inset-0 h-full w-full bg-red opacity-50"></div>
        )}
      </div>
    </>
  );
}
