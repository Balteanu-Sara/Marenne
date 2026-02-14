"use client";

import { useStateContext } from "@/context/CurrentStateContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Cart() {
  const {
    isCartOpen,
    toggleCart,
    products,
    updateItem,
    removeFromCart,
    clearCart,
  } = useStateContext();
  const [loading, setLoading] = useState(false);

  async function handleClick(callback: () => void) {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    callback();
    setLoading(false);
  }

  const total = 12.5 * products.reduce((sum, prod) => sum + prod.count, 0);

  return (
    <>
      {isCartOpen && <div className="fixed inset-0 z-5" onClick={toggleCart} />}
      <div
        className={`flex flex-col  text-lg ${products.length ? "justify-between" : "justify-center"} ${loading ? "pointer-events-none" : ""} fixed z-10 bg-yellow overflow-y-auto p-[30px] top-0 bottom-0 w-[80%] lg:w-[35%] transform transition-[left] duration-500
    ${isCartOpen ? "left-[20%] lg:left-[65%]" : "left-[100%]"}
        }`}
      >
        {products.length === 0 && (
          <p className="font-courier self-center">Your cart is empty!</p>
        )}
        {products.length > 0 && (
          <>
            <div className="overflow-x-hidden overflow-y-auto border-t-black border-t-[1px] scrollbar-thin">
              {products.map((product) => {
                return (
                  <div
                    className="flex flex-row justify-between font-courier text-sm py-5 border-b-black border-b-[1px]"
                    key={product.key}
                  >
                    <Link
                      href={`/books/${product.key.replace("/works/", "")}`}
                      className="w-1/4"
                      onClick={toggleCart}
                    >
                      <Image
                        src={`https://covers.openlibrary.org/b/id/${product.cover_i}-M.jpg`}
                        width={100}
                        height={160}
                        alt={`Cover book for ${product.title}`}
                        className="w-auto h-auto max-h-[160px] mx-auto"
                      />
                    </Link>
                    <div className="flex flex-col justify-between w-2/4 px-3">
                      <div className="flex flex-col gap-2">
                        <p>{product.author_name}</p>
                        <Link
                          href={`/books/${product.key.replace("/works/", "")}`}
                          onClick={toggleCart}
                        >
                          <strong>{product.title}</strong>
                        </Link>
                        <p>$12,5</p>
                      </div>
                      <div className="flex flex-row gap-3">
                        <button
                          onClick={() =>
                            handleClick(() => updateItem(product.key, -1))
                          }
                          disabled={product.count === 1}
                          className={product.count === 1 ? "opacity-50" : ""}
                        >
                          -
                        </button>
                        <p>{product.count}</p>
                        <button
                          onClick={() =>
                            handleClick(() => updateItem(product.key, 1))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="uppercase w-1/4 h-4 text-black transition-colors duration-300 hover:text-green"
                      onClick={() =>
                        handleClick(() => removeFromCart(product.key))
                      }
                    >
                      Remove
                    </button>
                  </div>
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
                <button className="font-garamond text-left py-2 text-[30px]">
                  <span className="text-black transition-colors duration-300 hover:text-green">
                    Checkout
                  </span>
                </button>
              </div>
              <button
                className="font-courier text-left uppercase text-sm pt-1"
                onClick={() => handleClick(() => clearCart())}
              >
                <span className="text-black transition-colors duration-300 hover:text-green">
                  Clear
                </span>
              </button>
            </div>
          </>
        )}
        {loading && (
          <div className="absolute z-15 inset-0 h-full w-full bg-yellow opacity-50"></div>
        )}
      </div>
    </>
  );
}
