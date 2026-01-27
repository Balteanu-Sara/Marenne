"use client";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function ViewMore({
  href,
  message = "",
}: {
  href: string;
  message: string;
}) {
  const { user } = useAuthContext();
  return (
    <Link
      href={href}
      className={`block text-center font-garamond text-[20px] hover:underline ${(message === "" || message === "recommended books") && !user && "hidden"} `}
    >
      View more{" " + message}
    </Link>
  );
}
