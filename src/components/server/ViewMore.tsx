import Link from "next/link";

export default function ViewMore({
  href,
  message = "",
}: {
  href: string;
  message: string;
}) {
  return (
    <Link
      href={href}
      className="block justify-self-center font-garamond text-[20px] hover:underline"
    >
      View more{" " + message}
    </Link>
  );
}
