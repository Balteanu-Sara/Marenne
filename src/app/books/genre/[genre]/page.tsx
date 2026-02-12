import { GenreSection, LoadingBooks } from "@/components/server/indexServer";
import { Suspense } from "react";

export default async function Genre({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;
  console.log(genre);

  return (
    <main className="p-[15px] w-[100%] gap-2 mt-[15px]">
      <p className="text-center font-garamond text-[30px] pb-[10px]">
        {genre !== "lgbt" ? genre[0].toUpperCase() + genre.slice(1) : "LGBT"}
      </p>

      <Suspense fallback={<LoadingBooks len={9} />}>
        <GenreSection genre={genre} />
      </Suspense>
    </main>
  );
}
