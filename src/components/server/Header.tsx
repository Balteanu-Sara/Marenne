import Link from "next/link";
import {
  Carousel,
  MobileMenu,
  DesktopMenu,
} from "@/components/client/indexClient";
import { Suspense } from "react";

function Logo() {
  return (
    <>
      <div className="lg:hidden text-[32vw] font-title leading-none px-[15px] -translate-y-[0.12em] justify-self-center">
        <Link href="/">MARENNE</Link>
      </div>
      <Link
        href="/"
        className="hidden lg:flex lg:flex-row text-[18.5vw] font-title text-center leading-none px-[15px] justify-between lg:-translate-y-[0.2em] lg:-mb-[0.15em]"
      >
        <span className="block">MARENNE</span>
        <span className="block">BOOKS</span>
      </Link>
    </>
  );
}

function Menu() {
  return (
    <div>
      <Suspense
        fallback={<div className="w-full h-[40px] bg-grey-3 animate-pulse" />}
      >
        <MobileMenu />
        <DesktopMenu />
      </Suspense>
    </div>
  );
}

export default function Header() {
  return (
    <header>
      <Logo />
      <Menu />
      <Suspense
        fallback={<div className="w-full h-[40px] bg-grey-3 animate-pulse" />}
      >
        <Carousel />
      </Suspense>
    </header>
  );
}
