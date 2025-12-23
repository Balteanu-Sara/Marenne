import { searchBooks, clearResult } from "@/lib/openLibrary";
import { Book } from "@/types";

export default async function NewReleases() {
  const newReleasesDocs = await searchBooks(
    "and+OR+the+OR+love&first_publish_year=2025"
  );
  const newReleases: Book[] = await clearResult(newReleasesDocs);
  console.log("this is me");

  return (
    <section>
      {newReleases.map((release) => (
        <div key={release.id}>
          <h1>Title: {release.title}</h1>
          <p>Author: {release.author}</p>
          <img
            src={`https://covers.openlibrary.org/b/id/${release.cover}-M.jpg`}
          />
        </div>
      ))}
    </section>
  );
}
