import Link from "next/link";

function ShopSection() {
  return (
    <section className="pt-[5px] pb-[8px]">
      <p className="font-courier text-sm uppercase">Shop</p>
      <ul className="font-garamond text-2xl">
        <li className="h-[27px]">
          <Link href="/" className="lg:hover:text-white">
            All
          </Link>
        </li>
        <li className="h-[27px]">
          <Link href="/books" className="lg:hover:text-white">
            Books
          </Link>
        </li>
        <li className="h-[27px]">
          <Link href="/" className="lg:hover:text-white">
            Magazines
          </Link>
        </li>
        <li className="h-[27px]">
          <Link href="/" className="lg:hover:text-white">
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
      <p className="font-courier text-sm uppercase">Links</p>
      <ul className="font-garamond text-2xl">
        <li className="h-[27px]">
          <Link href="/" className="lg:hover:text-white">
            F.A.Q.s
          </Link>
        </li>
        <li className="h-[27px]">
          <a
            href="https://www.instagram.com/antennebooks"
            target="_blank"
            title="Instagram account"
            className="lg:hover:text-white"
          >
            Instagram
          </a>
        </li>
        <li className="h-[27px]">
          <a
            href="google.com/maps/place/73+Farringdon+Rd,+London+EC1M+3JQ,+UK/@51.5210262,-0.109002,17z/data=!3m1!4b1!4m6!3m5!1s0x48761b4e1a800293:0x4e19a2a47fe3cba9!8m2!3d51.5210262!4d-0.1064271!16s%2Fg%2F11c3rmm7wg?entry=tts&g_ep=EgoyMDI0MTExMC4wIPu8ASoASAFQAw%3D%3D"
            target="_blank"
            title="Marenne Books Location"
            className="lg:hover:text-white"
          >
            Location
          </a>
        </li>
      </ul>
    </section>
  );
}

function Logo() {
  return <div className="font-title text-[18.4vw]">MARENNE BOOKS</div>;
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
      <div className="font-courier justify-self-center">
        <p>Copyright © 2026 MARENNE BOOKS</p>
        <p className="text-sm text-center">
          Powered and secured by{" "}
          <a href="https://www.netlify.com/" target="_blank">
            Netlify
          </a>{" "}
        </p>
      </div>
    </footer>
  );
}
