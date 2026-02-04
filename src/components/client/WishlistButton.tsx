/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const inWishlist = userProfile?.wishlist?.includes(bookId) ?? false;
    setIsInWishlist(inWishlist);

    if (inWishlist) {
      setTimeout(() => {
        setMessage("Added!");
      }, 2000);
      setTimeout(() => {
        setMessage("Remove from Wishlist");
      }, 4000);
    } else {
      setTimeout(() => {
        setMessage("Removed!");
      }, 2000);
      setTimeout(() => {
        setMessage("Add to Wishlist");
      }, 4000);
    }
    setIsInWishlist(inWishlist);
  }, [userProfile, bookId]);

  async function handleClick() {
    if (!isInWishlist) {
      setMessage("Adding...");

      const result = user
        ? await addInWishlist(user?.uid, bookId)
        : { success: false };

      if (!result.success) {
        setMessage("Cannot make edits right now!");
        return;
      }
    } else {
      setMessage("Removing...");

      const result = user
        ? await removeFromWishlist(user?.uid, bookId)
        : { success: false };

      if (!result.success) {
        setMessage("Cannot make edits right now!");
        return;
      }
    }
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
