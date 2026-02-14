"use client";
import { useState } from "react";
import Image from "next/image";

export default function BookCover({
  image,
  title,
}: {
  image: number;
  title: string;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-[120px] h-[195px] sm:w-[180px] sm:h-[275px]">
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse border-1 border-black border-solid" />
      )}
      <Image
        src={`https://covers.openlibrary.org/b/id/${image}-M.jpg`}
        priority
        width={120}
        height={195}
        alt={`Cover book for ${title}`}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        className="w-[120px] h-[195px] sm:w-[180px] sm:h-[275px] border-1 border-black border-solid"
      />
    </div>
  );
}
