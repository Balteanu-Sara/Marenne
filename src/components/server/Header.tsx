import Link from "next/link";
import { Suspense } from "react";
import {
  Search,
  Carousel,
  MobileMenu,
  DesktopMenu,
} from "@/components/client/indexClient";
import { StateProvider } from "@/context/CurrentStateContext";

function Logo() {
  return (
    <>
      <div className="lg:hidden text-[32vw] font-title leading-none px-[15px] -translate-y-[0.12em] justify-self-center">
        <Link href="/">MARENNE</Link>
      </div>
      <div className="hidden lg:inline text-[18.8vw] font-title leading-none px-[15px] -translate-y-[0.15em] justify-self-center">
        <Link href="/">MARENNE BOOKS</Link>
      </div>
    </>
  );
}

function Menu() {
  return (
    <div>
      <StateProvider>
        <Suspense fallback={<div>Loading mobile menu...</div>}>
          <MobileMenu />
        </Suspense>
        <DesktopMenu />
      </StateProvider>
    </div>
  );
}

function LeftMenu() {
  return (
    <>
      <p className="lg:hidden">Menu</p>
      <div className="hidden gap-2 lg:flex lg:row">
        <Link href="/">All,</Link> <Link href="/">Books,</Link>{" "}
        <Link href="/">Magazines,</Link>
        <Search />
      </div>
    </>
  );
}

function RightMenu() {
  return (
    <div className="flex row gap-2">
      <p>English,</p>
      {/* <p className="hidden lg:inline">Profile</p> */}
      <p>Login,</p>
      <p>Cart</p>
    </div>
  );
}

export default function Header() {
  return (
    <header>
      <Logo />
      <Menu />
      <Carousel />
    </header>
  );
}
