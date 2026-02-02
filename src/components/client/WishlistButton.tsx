"use client";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { addInWishlist, removeFromWishlist } from "@/lib/auth";

export default function WishlistButton({ bookId }: { bookId: string }) {
  const { user, userProfile } = useAuthContext();
  const [isInWishlist, setIsInWishlist] = useState(
    userProfile?.wishlist?.includes(bookId) ?? false,
  );
  const [message, setMessage] = useState(
    isInWishlist ? "Remove from Wishlist" : "Add to Wishlist",
  );

  async function handleClick() {
    if (isInWishlist) setMessage("Removing...");
    else setMessage("Adding...");

    const result =
      isInWishlist && user
        ? await removeFromWishlist(user.uid, bookId)
        : user
          ? await addInWishlist(user?.uid, bookId)
          : { success: false };

    if (!result.success) {
      setMessage("Cannot make edits right now!");
      return;
    }

    setTimeout(() => {
      if (isInWishlist) setMessage("Removed!");
      else setMessage("Added!");
    }, 2000);
    setTimeout(() => {
      if (isInWishlist) setMessage("Add to Wishlist");
      else setMessage("Remove from Wishlist");
      setIsInWishlist((prev) => !prev);
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
