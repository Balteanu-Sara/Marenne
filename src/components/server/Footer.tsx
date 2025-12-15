function ShopSection() {
  return (
    <section>
      <p>Shop</p>
      <div>Home</div>
      <div>Books</div>
      <div>About Us</div>
    </section>
  );
}

function LinksSection() {
  return (
    <section>
      <p>More</p>
      <div>FAQ</div>
      <div>Instagram</div>
      <div>Location</div>
    </section>
  );
}

function Logo() {
  return <div>ANTENNE BOOKS</div>;
}

export default function Footer() {
  return (
    <footer>
      <ShopSection />
      <LinksSection />
      <Logo />
      <div>
        Copyright © {new Date().getFullYear()} MARENNE BOOKS Powered and secured
        by{" "}
        <a href="https://www.netlify.com/" target="_blank">
          Netlify
        </a>
      </div>
    </footer>
  );
}
