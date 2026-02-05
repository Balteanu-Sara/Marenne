import Link from "next/link";

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
  return (
    <Link href={href} className={style ? style : ""} onClick={click}>
      {innerText}
    </Link>
  );
}
