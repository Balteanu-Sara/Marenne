import Link from "next/link";
import { Search } from "@/components/client/indexClient";

export default function DesktopMenu() {
  return (
    <div className="hidden lg:gap-2 lg:flex lg:row">
      <Link href="/">All,</Link> <Link href="/">Books,</Link>{" "}
      <Link href="/">Magazines,</Link>
      <Search />
    </div>
  );
}
