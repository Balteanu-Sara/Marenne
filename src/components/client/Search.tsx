"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { useEffect, useState } from "react";

export default function Search() {
  const { isSearchOpen, toggleSearch } = useStateContext();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isSearchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  return (
    <>
      {isSearchOpen && (
        <div className="fixed inset-0 z-5" onClick={toggleSearch} />
      )}
      <div>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
