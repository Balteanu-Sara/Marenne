"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { Search, Cart, OptionMenu } from "@/components/client/indexClient";
import { usePathname } from "next/navigation";

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

export default function MobileMenu() {
  const {
    isMenuOpen,
    isFilterOpen,
    toggleMenu,
    toggleFilter,
    toggleCart,
    toggleSearch,
  } = useStateContext();
  const pathName = usePathname();

  return (
    <div className="relative top-0 z-10 flex flex-col px-[15px] font-garamond text-[30px] h-auto lg:hidden">
      <div className="flex flex-row justify-between">
        <button onClick={toggleMenu}>{isMenuOpen ? "Close" : "Menu"}</button>
        {pathName.includes("books") && (
          <button onClick={toggleFilter}>
            {isFilterOpen ? "Close" : "Filter"}
          </button>
        )}
        <button onClick={toggleCart}>Cart</button>
      </div>
      <Cart />
      <div
        className={`flex flex-row justify-between absolute w-screen z-4 bg-gradient-to-b from-[#ffffff] to-[#f2f2f2] top-8 left-0 pl-[15px] pr-[15px] overflow-hidden transition-all duration-500
          ${isMenuOpen ? "h-[150px] mt-3 mb-3" : "h-0"} `}
      >
        <div className="flex flex-col">
          <OptionMenu
            href="/"
            style="h-[35px]"
            click={toggleMenu}
            innerText="All"
          />
          <OptionMenu
            href="/books"
            style="h-[35px]"
            click={toggleMenu}
            innerText="Books"
          />
          <OptionMenu
            href="/magazines"
            style="h-[35px]"
            click={toggleMenu}
            innerText="Magazines"
          />
          <button onClick={toggleSearch} className="h-[35px] text-left">
            Search
          </button>
        </div>
        <div className="flex flex-col text-end">
          <button className="h-[35px]" onClick={toggleMenu}>
            Login
          </button>
          <button className="h-[35px]" onClick={toggleMenu}>
            English
          </button>
        </div>
      </div>

      <div
        className={`flex flex-col absolute w-screen z-4 bg-gradient-to-b from-[#ffffff] to-[#f2f2f2] top-8 left-0 pl-[15px] pr-[15px] overflow-hidden transition-all duration-500
          ${isFilterOpen ? "h-[795px] mt-3 mb-3" : "h-0"} `}
      >
        <hr />
        {genres.map((genre, index) => {
          return (
            <p key={genre + index}>
              <OptionMenu
                href={`/books/genre/${genre.toLowerCase()}`}
                style="block h-[35px]"
                click={toggleFilter}
                innerText={genre}
              />
            </p>
          );
        })}
        <hr className="mt-[10px]" />
      </div>
      <Search />
    </div>
  );
}
