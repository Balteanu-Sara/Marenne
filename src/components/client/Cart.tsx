"use client";

import { useStateContext } from "@/context/CurrentStateContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Cart() {
  const {
    isCartOpen,
    toggleCart,
    products,
    updateItem,
    removeFromCart,
    clearCart,
  } = useStateContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  useEffect(() => {
    setTotal(12.5 * products.length);
  }, [products]);

  return (
    <>
      {isCartOpen && <div className="fixed inset-0 z-5" onClick={toggleCart} />}
      <div
        className={`flex flex-col ${products.length ? "justify-between" : "justify-center"} fixed z-10 bg-yellow overflow-y-auto p-[30px] top-0 bottom-0 w-[80%] transform transition-[left] duration-500
    ${isCartOpen ? "left-[20%]" : "left-[100%]"}
        }`}
      >
        {products.length === 0 && (
          <p className="font-courier self-center">Your cart is empty!</p>
        )}
        {products.length > 0 && (
          <>
            <div className="overflow-x-hidden overflow-y-auto border-t-black border-t-[1px]">
              {products.map((product) => {
                return (
                  <Link
                    href={`/books/${product.key.replace("/works/", "")}`}
                    key={product.key}
                    className="flex flex-row justify-between font-courier text-sm py-5 border-b-black border-b-[1px]"
                  >
                    <Image
                      src={`https://covers.openlibrary.org/b/id/${product.cover_i}-M.jpg`}
                      width={100}
                      height={160}
                      alt={`Cover book for ${product.title}`}
                      className="w-1/4 h-[160px]"
                    />
                    <div className="flex flex-col justify-between w-2/4 px-3">
                      <div className="flex flex-col gap-2">
                        <p>{product.author_name}</p>
                        <p>
                          <strong>{product.title}</strong>
                        </p>
                        <p>$12,5</p>
                      </div>
                      <div className="flex flex-row gap-3">
                        <button onClick={() => updateItem(product.key, -1)}>
                          -
                        </button>
                        <p>{product.count}</p>
                        <button onClick={() => updateItem(product.key, 1)}>
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="uppercase w-1/4 h-4"
                      onClick={() => removeFromCart(product.key)}
                    >
                      Remove
                    </button>
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col">
              <div className="w-full flex flex-col border-t-black border-t-[1px] border-b-black border-b-[1px]">
                <div className="py-1 border-b-black border-b-[1px]">
                  <p className="font-courier uppercase text-sm">
                    Total (Shipping not included)
                  </p>
                  <p className="text-[30px] h-11">${total}</p>
                </div>
                <button className="font-garamond text-left py-2 text-[30px] lg:opacity-100 lg:transition-colors lg:duration-300 lg:hover:font-green">
                  Checkout
                </button>
              </div>
              <button
                className="font-courier text-left uppercase text-sm pt-1"
                onClick={clearCart}
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
