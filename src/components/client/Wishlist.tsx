"use client";

import { useStateContext } from "@/context/CurrentStateContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserWishlist, removeFromWishlist } from "@/lib/auth";
import { useAuthContext } from "@/context/AuthContext";

export default function Wishlist() {
  const { isWishlistOpen, toggleWishlist } = useStateContext();
  const { user } = useAuthContext();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isWishlistOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isWishlistOpen]);

  async function handleClick(callback: () => void) {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    callback();
    setLoading(false);
  }

  return (
    <>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-5" onClick={toggleWishlist} />
      )}
      <div
        className={`flex flex-col text-white text-lg ${books.length ? "justify-between" : "justify-center"} ${loading ? "pointer-events-none" : ""} fixed z-10 bg-red overflow-y-auto p-[30px] top-0 bottom-0 w-[80%] transform transition-[left] duration-500
    ${isWishlistOpen ? "left-[20%]" : "left-[100%]"}
        }`}
      >
        {books.length === 0 && (
          <p className="font-courier self-center">Your wishlist is empty!</p>
        )}

        {loading && (
          <div className="absolute z-15 inset-0 h-full w-full bg-yellow opacity-50"></div>
        )}
      </div>
    </>
  );
}
