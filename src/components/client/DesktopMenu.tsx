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
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { logout } from "@/lib/auth";
import { usePathname } from "next/navigation";

export default function DesktopMenu() {
  const {
    toggleLogin,
    toggleCart,
    clearCart,
    products,
    toggleSearch,
    toggleProfile,
    toggleWishlist,
  } = useStateContext();
  const { user } = useAuthContext();
  const pathName = usePathname();

  const prods = products.reduce((sum, prod) => sum + prod.count, 0);

  return (
    <div className="hidden relative px-[15px] pb-2 font-garamond text-[30px] h-auto gap-2 lg:flex lg:flex-row lg:justify-between lg:text-3xl">
      <div>
        <Link
          href="/"
          className={`text-black transition-colors duration-300 hover:text-grey-4 ${pathName.endsWith("/") ? "italic" : ""}`}
        >
          Home,
        </Link>{" "}
        <Link
          href="/books"
          className={`text-black transition-colors duration-300 hover:text-grey-4  ${pathName.endsWith("/books") ? "italic" : ""}`}
        >
          Books,
        </Link>{" "}
        <Link
          href="/magazines"
          className={`text-black transition-colors duration-300 hover:text-grey-4 ${pathName.endsWith("/") ? "italic" : ""}`}
        >
          Magazines,
        </Link>{" "}
        <button
          onClick={toggleSearch}
          className="cursor-pointer text-black transition-colors duration-300 hover:text-grey-4"
        >
          Search
        </button>
      </div>
      {user ? (
        <div>
          <button
            className="h-[35px] text-right cursor-pointer text-black transition-colors duration-300 hover:text-grey-4"
            onClick={async () => {
              await logout();
              clearCart();
            }}
          >
            <Link href="/">Logout, </Link>
          </button>{" "}
          <button
            className="text-right cursor-pointer text-black transition-colors duration-300 hover:text-grey-4"
            onClick={toggleProfile}
          >
            Profile,
          </button>{" "}
          <button
            className="text-right cursor-pointer text-black transition-colors duration-300 hover:text-grey-4"
            onClick={toggleWishlist}
          >
            Wishlist,
          </button>{" "}
          <button
            onClick={toggleCart}
            className="text-right cursor-pointer text-black transition-colors duration-300 hover:text-grey-4"
          >
            Cart ({products.reduce((sum, prod) => sum + prod.count, 0)}){" "}
          </button>
        </div>
      ) : (
        <div>
          <button
            className="text-right cursor-pointer text-black transition-colors duration-300 hover:text-grey-4"
            onClick={toggleLogin}
          >
            Login,
          </button>{" "}
          <OptionMenu
            href="/"
            style={`text-right cursor-pointer text-black transition-colors duration-300 hover:text-grey-4 ${pathName.endsWith("/about-us") ? "italic" : ""}`}
            click={undefined}
            innerText="About Us,"
          />{" "}
          <button
            onClick={toggleCart}
            className="text-right cursor-pointer text-black transition-colors duration-300 hover:text-grey-4"
          >
            Cart ({prods}){" "}
          </button>
        </div>
      )}
      <Cart />
      <Wishlist />
      <Search />
      <Login />
      <Profile />
    </div>
  );
}
