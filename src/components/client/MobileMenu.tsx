"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import {
  Search,
  Cart,
  OptionMenu,
  Login,
  Profile,
  Wishlist,
} from "@/components/client/indexClient";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { logout } from "@/lib/auth";

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
    toggleLogin,
    toggleCart,
    clearCart,
    toggleSearch,
    toggleProfile,
    toggleWishlist,
  } = useStateContext();
  const { user } = useAuthContext();
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
      <Wishlist />
      {isMenuOpen && <div className="fixed inset-0 z-3" onClick={toggleMenu} />}
      <div
        className={`flex flex-row justify-between absolute w-screen z-4 bg-gradient-to-b from-[#ffffff] to-[#f2f2f2] top-8 left-0 pl-[15px] pr-[15px] overflow-hidden transition-all duration-500
          ${isMenuOpen ? "h-[150px] mt-3 mb-3" : "h-0"} `}
      >
        <div className="flex flex-col">
          <OptionMenu
            href="/"
            style="h-[35px]"
            click={toggleMenu}
            innerText="Home"
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
        <div className="flex flex-col">
          {user ? (
            <>
              <button
                className="h-[35px] text-right"
                onClick={async () => {
                  await logout();
                  toggleMenu();
                  clearCart();
                }}
              >
                <Link href="/">Logout</Link>
              </button>
              <button className="h-[35px] text-right" onClick={toggleProfile}>
                Profile
              </button>
              <button className="h-[35px] text-right" onClick={toggleWishlist}>
                Wishlist
              </button>
            </>
          ) : (
            <>
              <button className="h-[35px] text-right" onClick={toggleLogin}>
                Login
              </button>

              <OptionMenu
                href="/"
                style="h-[35px]"
                click={toggleMenu}
                innerText="About Us"
              />
            </>
          )}
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
      <Login />
      <Profile />
    </div>
  );
}
