"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { useState } from "react";
import { Book } from "@/types";
import { useAuthContext } from "@/context/AuthContext";

export default function WishlistButton({ book }: { book: Book }) {
  const { addToCart } = useStateContext();
  const { user } = useAuthContext();
  const [message, setMessage] = useState("Add to Cart");

  function handleClick() {
    setMessage("Adding...");
    // addBook / removeBook from wishlist

    setTimeout(() => {
      setMessage("Added!");
    }, 2000);
    setTimeout(() => {
      setMessage("Add to Wishlist");
    }, 4000);
  }

  if (user) {
    return (
      <button
        className={`py-2 text-[30px] w-[100%] text-left border-b-black border-b-[1px] lg:opacity-100 lg:transition-opacity lg:duration-300 ${message === "Add to Cart" && "lg:hover:opacity-50"}`}
        onClick={handleClick}
        disabled={
          message !== "Add to Wishlist" && message !== "Remove from Wishlist"
        }
      >
        {message}
      </button>
    );
  }
}
