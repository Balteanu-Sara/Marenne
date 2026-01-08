"use client";

import { useStateContext } from "@/context/CurrentStateContext";
import { useEffect } from "react";

export default function Cart() {
  const { isCartOpen, toggleCart } = useStateContext();

  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      {isCartOpen && <div className="fixed inset-0 z-5" onClick={toggleCart} />}
      <div
        className={`flex justify-center items-center fixed z-10 bg-yellow overflow-y-auto p-[15px] font-courier top-0 bottom-0 w-[80%] transform transition-[left] duration-500
    ${isCartOpen ? "left-[20%]" : "left-[100%]"}
        }`}
      >
        <p>Your cart is empty!</p>
      </div>
    </>
  );
}
