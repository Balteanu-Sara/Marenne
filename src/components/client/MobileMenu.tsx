"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { Search, Cart } from "@/components/client/indexClient";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const { isMenuOpen, toggleMenu, toggleCart, close } = useStateContext();
  const pathName = usePathname();

  return (
    <div className="relative top-0 z-10 flex flex-col px-[15px] font-garamond text-[30px] h-auto lg:hidden">
      <div className="flex flex-row justify-between">
        <button onClick={toggleMenu}>{isMenuOpen ? "Close" : "Menu"}</button>
        <button
          onClick={() => {
            close();
            toggleCart();
          }}
        >
          Cart
        </button>
      </div>
      <Cart />
      <div
        className={`flex flex-row justify-between absolute w-screen z-4 bg-gradient-to-b from-[#ffffff] to-[#f2f2f2] top-8 left-0 pl-[15px] pr-[15px] overflow-hidden transition-all duration-500
          ${isMenuOpen ? "h-[150px] mt-3 mb-3" : "h-0"} `}
      >
        <div className="flex flex-col">
          <Link href="/" className="h-[35px] ">
            All
          </Link>
          <Link href="/" className="h-[35px]">
            Books
          </Link>
          <Link href="/" className="h-[35px]">
            Magazines
          </Link>
          {pathName.endsWith("books") && <p>Filter</p>}
          <Search />
        </div>
        <div className="flex flex-col text-end">
          <Link href="/" className="h-[35px]">
            Login
          </Link>
          <button className="h-[35px]">English</button>
        </div>
      </div>
    </div>
  );
}
