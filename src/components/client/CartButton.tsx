"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { Book } from "@/types";

export default function CartButton({ book }: { book: Book }) {
  const { addToCart } = useStateContext();
  return (
    <button
      className="py-2 text-[30px] lg:opacity-100 lg:transition-opacity lg:duration-300 lg:hover:opacity-50"
      onClick={() =>
        addToCart({
          author_name: book.author ? [book.author] : [],
          cover_i: book.cover,
          key: book.id,
          title: book.title,
        })
      }
    >
      Add to Cart
    </button>
  );
}
