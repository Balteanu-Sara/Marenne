import Link from "next/link";

function ShopSection() {
  return (
    <section className="pt-[5px] pb-[8px]">
      <p className="font-courier text-sm uppercase lg:text-lg">Shop</p>
      <ul className="font-garamond text-2xl lg:text-4xl">
        <li className="h-[27px] lg:h-[35px]">
          <Link
            href="/"
            className="lg:text-black lg:transition-colors lg:duration-300 lg:hover:text-white"
          >
            Home
          </Link>
        </li>
        <li className="h-[27px] lg:h-[35px]">
          <Link
            href="/books"
            className="lg:text-black lg:transition-colors lg:duration-300 lg:hover:text-white"
          >
            Books
          </Link>
        </li>
        <li className="h-[27px] lg:h-[35px]">
          <Link
            href="/magazines"
            className="lg:text-black lg:transition-colors lg:duration-300 lg:hover:text-white"
          >
            Magazines
          </Link>
        </li>
        <li className="h-[27px] lg:h-[35px]">
          <Link
            href="/about-us"
            className="lg:text-black lg:transition-colors lg:duration-300 lg:hover:text-white"
          >
            About Us
          </Link>
        </li>
      </ul>
    </section>
  );
}

function LinksSection() {
  return (
    <section className="pt-[5px] pb-[8px]">
      <p className="font-courier text-sm uppercase lg:text-lg">Links</p>
      <ul className="font-garamond text-2xl lg:text-4xl">
        <li className="h-[27px] lg:h-[35px]">
          <Link
            href="/faq"
            className="cursor-pointer text-black lg:transition-colors lg:duration-300 lg:hover:text-white"
          >
            F.A.Q.s
          </Link>
        </li>
        <li className="h-[27px] lg:h-[35px]">
          <a
            href="https://www.instagram.com/antennebooks"
            target="_blank"
            title="Instagram account"
            className="cursor-pointer lg:text-black lg:transition-colors lg:duration-300 lg:hover:text-white"
          >
            Instagram
          </a>
        </li>
        <li className="h-[27px] lg:h-[35px]">
          <a
            href="https://www.google.com/maps/place/73+Farringdon+Rd,+London+EC1M+3JQ,+UK/@51.5210262,-0.109002,17z/data=!3m1!4b1!4m6!3m5!1s0x48761b4e1a800293:0x4e19a2a47fe3cba9!8m2!3d51.5210262!4d-0.1064271!16s%2Fg%2F11c3rmm7wg?entry=tts&g_ep=EgoyMDI0MTExMC4wIPu8ASoASAFQAw%3D%3D"
            target="_blank"
            title="Marenne Books Location"
            className="cursor-pointer lg:text-black lg:transition-colors lg:duration-300 lg:hover:text-white"
          >
            Location
          </a>
        </li>
      </ul>
    </section>
  );
}

function Logo() {
  return (
    <div className="font-title flex flex-row justify-around text-[17.7vw] -translate-y-[0.3em] -mb-[0.3em] lg:text-[18vw] lg:-translate-y-[0.4em] lg:-mb-[0.5em] pointer-events-none">
      <p>MARENNE</p>
      <p>BOOKS</p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-green color-black p-[15px]">
      <hr />
      <ShopSection />
      <hr />
      <LinksSection />
      <hr />
      <Logo />
      <div className="font-courier text-center">
        <p className="text-center text-sm lg:text-xl">
          Copyright © 2026 MARENNE BOOKS
        </p>
        <p className="text-xs lg:text-lg text-center">
          Powered and secured by{" "}
          <a href="https://vercel.com/" target="_blank">
            Vercel
          </a>{" "}
        </p>
      </div>
    </footer>
  );
}
