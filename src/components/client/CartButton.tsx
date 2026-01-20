"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { useState } from "react";
import { Book } from "@/types";

export default function CartButton({ book }: { book: Book }) {
  const { addToCart } = useStateContext();
  const [message, setMessage] = useState("Add to Cart");

  function handleClick() {
    setMessage("Adding...");
    addToCart({
      author_name: book.author ? [book.author] : [],
      cover_i: book.cover,
      key: book.id,
      title: book.title,
    });

    setTimeout(() => {
      setMessage("Added!");
    }, 2000);
    setTimeout(() => {
      setMessage("Add to Cart");
    }, 4000);
  }

  return (
    <button
      className={`py-2 text-[30px] lg:opacity-100 lg:transition-opacity lg:duration-300 ${message === "Add to Cart" && "lg:hover:opacity-50"}`}
      onClick={handleClick}
      disabled={message !== "Add to Cart"}
    >
      {message}
    </button>
  );
}
