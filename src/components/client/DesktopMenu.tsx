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

  return (
    <div className="hidden relative px-[15px] pb-1 font-garamond text-[30px] h-auto lg:gap-2 lg:flex lg:flex-row lg:justify-between">
      <div>
        <Link
          href="/"
          className="lg:text-black lg:transition-colors lg:duration-300 lg:hover:text-grey-4"
        >
          Home,
        </Link>{" "}
        <Link href="/books">Books,</Link>{" "}
        <Link href="/magazines">Magazines,</Link>{" "}
        <button onClick={toggleSearch}>Search</button>
      </div>
      {user ? (
        <div>
          <button
            className="h-[35px] text-right"
            onClick={async () => {
              await logout();
              clearCart();
            }}
          >
            <Link href="/">Logout, </Link>
          </button>{" "}
          <button className="text-right" onClick={toggleProfile}>
            Profile,
          </button>{" "}
          <button className="text-right" onClick={toggleWishlist}>
            Wishlist,
          </button>{" "}
          <button onClick={toggleCart} className="text-right">
            Cart ({products.length}){" "}
          </button>
        </div>
      ) : (
        <div>
          <button className="text-right" onClick={toggleLogin}>
            Login,
          </button>{" "}
          <OptionMenu
            href="/"
            style="text-right"
            click={undefined}
            innerText="About Us,"
          />{" "}
          <button onClick={toggleCart} className="text-right">
            Cart ({products.length}){" "}
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
