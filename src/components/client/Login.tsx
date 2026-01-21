"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { useState } from "react";

export default function Login() {
  const { isLoginOpen, toggleLogin } = useStateContext();
  const [hasAccount, setHasAccount] = useState(true);
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");

  return (
    <>
      {isLoginOpen && (
        <div className="fixed inset-0 z-5" onClick={toggleLogin} />
      )}
      <div
        className={`bg-red p-[15px] text-white flex flex-col justify-center items-center gap-10 fixed left-[15px] w-[calc(100vw-30px)] top-[30%] h-[calc(100vh-450px)] transition duration-300 
      ${
        isLoginOpen
          ? "z-9 opacity-100 pointer-events-auto"
          : "-z-1 opacity-0 pointer-events-none"
      }`}
      >
        <p className="font-garmond text-4xl">
          {hasAccount ? "Login" : "Register"}
        </p>
        <div className="w-[80%] border-b-white border-b-[2px]">
          <input
            type="text"
            placeholder="Type in your username"
            value={query1}
            onChange={(e) => setQuery1(e.target.value)}
            className="font-garamond outline-none w-[100%] text-center"
          />
        </div>
        <div className="w-[80%] border-b-white border-b-[2px]">
          <input
            type="text"
            placeholder="Type in your password"
            value={query2}
            onChange={(e) => setQuery2(e.target.value)}
            className="font-garamond outline-none w-[100%] text-center"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-[100%] rounded h-15 text-center bg-black text-2xl">
            {hasAccount ? "Sign In" : "Create Account"}
          </button>
          {hasAccount ? (
            <p className="font-courier text-lg">
              Don&apos;t have an account? Register{" "}
              <button
                className="underline"
                onClick={() => setHasAccount((prev) => !prev)}
              >
                here
              </button>
              .{" "}
            </p>
          ) : (
            <p className="font-courier text-lg">
              Already have an account? Login{" "}
              <button
                className="underline"
                onClick={() => setHasAccount((prev) => !prev)}
              >
                here
              </button>
              .{" "}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
