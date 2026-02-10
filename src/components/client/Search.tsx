"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { searchBooks, clearResultOverview } from "@/lib/openLibrary";
import { LoadingBooks } from "@/components/server/indexServer";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchResult } from "@/types";

export default function Search() {
  const { isSearchOpen, toggleSearch } = useStateContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[] | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim() || query.trim().length < 3) {
      setLoading(false);
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      // setLoading(true);
      // try {
      //   const booksJson = await searchBooks(query);
      //   const books = await clearResultOverview(booksJson);
      //   setResults(books.slice(0, 5));
      // } catch (error) {
      //   console.error(error);
      // } finally {
      //   setLoading(false);
      // }

      const start = Date.now();
      setLoading(true);
      try {
        const booksJson = await searchBooks(query);
        const books = await clearResultOverview(booksJson);

        const elapsedTime = Date.now() - start;
        if (elapsedTime < 1000) {
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 - elapsedTime),
          );
        }
        setResults(books.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  function resetStates() {
    setQuery("");
    setResults([]);
  }

  return (
    <>
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            toggleSearch();
            resetStates();
          }}
        />
      )}
      <div
        className={`bg-green p-[15px] lg:p-[30px] flex flex-col fixed left-[15px] lg:left-[26%] w-[calc(100vw-30px)] lg:w-[calc(100vw-52%)] top-[130px] lg:top-[10%] h-[calc(100vh-200px)] lg:h-[85vh] transition duration-300 
        ${
          isSearchOpen
            ? "z-9 opacity-100 pointer-events-auto"
            : "-z-1 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-[100%] pb-0.5">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="font-garamond text-black outline-none lg:text-3xl w-[100%] text-center"
          />
          <hr />
        </div>
        <div className="pt-[15px] overflow-y-auto overflow-x-hidden scrollbar-thin">
          {loading && <LoadingBooks len={5} />}
          {!loading && query && results.length > 0 && (
            <>
              <div className="flex flex-wrap justify-center font-courier uppercase text-sm">
                {results
                  .filter((result, index) => index < 9)
                  .map((result) => {
                    return (
                      <Link
                        href={`/books/${result.key.replace("/works/", "")}`}
                        key={result.key}
                        className="flex flex-col justify-self-center m-3 w-[180px]"
                      >
                        <Image
                          src={`https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`}
                          width={180}
                          height={275}
                          alt={`Cover book for ${result.title}`}
                          className="w-[180px] h-[275px]"
                          onClick={() => {
                            toggleSearch();
                            resetStates();
                          }}
                        />
                        <div
                          className="font-courier text-center"
                          onClick={() => {
                            toggleSearch();
                            resetStates();
                          }}
                        >
                          <p className="text-clip">{result.title}</p>
                          <p>$20.50</p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
              {!loading && results.length > 0 && (
                <div className="text-center pt-[20px]">
                  <Link
                    href={`/search/${encodeURIComponent(query.toLowerCase())}`}
                    className="border-b-1"
                    onClick={() => {
                      toggleSearch();
                      resetStates();
                    }}
                    target={window.innerWidth < 1024 ? "_blank" : ""}
                  >
                    Show results for {query}
                  </Link>
                </div>
              )}
            </>
          )}
          {!loading && results.length === 0 && query.trim().length > 3 && (
            <div>No results found for &quot;{query}&quot;</div>
          )}
        </div>
      </div>
    </>
  );
}
