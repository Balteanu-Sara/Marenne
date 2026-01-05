"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { Search } from "@/components/client/indexClient";
import Link from "next/link";

export default function MobileMenu() {
  const { isMenuOpen, toggleMenu } = useStateContext();

  return (
    <div className="relative top-0 z-10 flex flex-col px-[15px] font-garamond text-[30px] lg:hidden">
      <div className="flex flex-row justify-between">
        <button onClick={toggleMenu}>{isMenuOpen ? "Close" : "Menu"}</button>
        <p>Cart</p>
      </div>
      <div
        className={`flex flex-row justify-between absolute w-screen z-10 bg-gradient-to-b from-[#ffffff] to-[#f2f2f2] top-8 left-0 pl-[15px] pr-[15px] overflow-hidden transition-all duration-500
          ${isMenuOpen ? "h-[150px] mt-3 mb-3" : "h-0"} `}
      >
        <div className="flex flex-col">
          <Link href="/" className="h-[35px]">
            All
          </Link>
          <Link href="/" className="h-[35px]">
            Books
          </Link>
          <Link href="/" className="h-[35px]">
            Magazines
          </Link>
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
