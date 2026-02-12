"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OptionMenu({
  href,
  style,
  click,
  innerText,
}: {
  href: string;
  style: string | undefined;
  click: (() => void) | undefined;
  innerText: string;
}) {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={
        style
          ? style +
            `${pathName.endsWith(innerText.toLowerCase()) ? " lg:italic" : ""}`
          : ""
      }
      onClick={click}
    >
      {innerText}
    </Link>
  );
}
