function Logo() {
  return (
    <div className="font-title justify-self-center">
      <span className="hidden lg:inline"> ANTENNE BOOKS</span>
      <span className="lg:hidden">ANTENNE</span>
    </div>
  );
}

function Menu() {
  return (
    <div className="flex row justify-between">
      <LeftMenu />
      <RightMenu />
    </div>
  );
}

function LeftMenu() {
  return <p>LeftMenu</p>;
}

function RightMenu() {
  return <p>RightMenu</p>;
}

function Banner() {
  return <p>Banner</p>;
}
export default function Header() {
  return (
    <header>
      <Logo />
      <Menu />
      <Banner />
    </header>
  );
}
