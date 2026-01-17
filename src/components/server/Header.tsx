import Link from "next/link";
import { Suspense } from "react";
import {
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
      <div className="hidden lg:inline text-[18.7vw] font-title leading-none px-[15px] -translate-y-[0.15em] justify-self-center">
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

export default function Header() {
  return (
    <header>
      <Logo />
      <Menu />
      <Suspense>
        <Carousel />
      </Suspense>
    </header>
  );
}
