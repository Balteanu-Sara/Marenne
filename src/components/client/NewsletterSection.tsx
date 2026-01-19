"use client";
import { useState, useEffect } from "react";

export default function NewsletterSection() {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse("");
    }, 5000);
    return () => {
      return clearTimeout(timeout);
    };
  }, [response]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query1 || !query2) {
      setResponse("You need to fill in all the fields!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(query2)) {
      setResponse("Email address is not valid!");
      return;
    }

    setResponse("You successfully subscribed to our newsletter!");
    setQuery1("");
    setQuery2("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col px-2 justify-center gap-5 w-100% min-h-[410px]"
    >
      <input
        className="w-100% text-black text-left text-[14px] pl-[16px] font-courier border-black border-[1px] border-solid font-normal h-[50px] bg-[rgb(255,255.255)] focus:outline-black"
        placeholder="Enter your first name"
        type="text"
        value={query1}
        onChange={(e) => setQuery1(e.target.value)}
      />
      <input
        className="w-100% text-black text-left text-[14px] pl-[16px] font-courier border-black border-[1px] border-solid font-normal h-[50px] bg-[rgb(255,255.255)] focus:outline-black"
        placeholder="Enter your email address"
        type="text"
        value={query2}
        onChange={(e) => setQuery2(e.target.value)}
      />
      <p className="w-100% text-left text-[12px] font-courier font-normal">
        We use email and targeted online advertising to send you product and
        services updates, promotional offers and other marketing communications
        based on the information we collect about you, such as your email
        address, general location, and purchase and website browsing history
      </p>
      <button
        type="submit"
        className="w-100% text-white font-courier text-center bg-black text-[16px] h-[50px]"
      >
        Subscribe
      </button>
      {}
      {response ? (
        <p className="w-100% text-left text-[12px] font-courier h-[30px]">
          {response}
        </p>
      ) : (
        <div className="h-[30px]" />
      )}
    </form>
  );
}
