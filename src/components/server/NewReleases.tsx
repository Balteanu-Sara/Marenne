import { searchBooks, clearResult } from "@/lib/openLibrary";
import { Book } from "@/types";

export default async function NewReleases() {
  const newReleasesDocs = await searchBooks(
    "and+OR+the+OR+love&first_publish_year=2025"
  );
  const newReleases: Book[] = await clearResult(newReleasesDocs);

  return (
    <section>
      {newReleases.map((release) => (
        <div key={release.id}>
          <p>Id: {release.id}</p>
          <h1>Title: {release.title}</h1>
          <p>Author: {release.author}</p>
          <div>
            Subjects:{" "}
            {release.subjects?.map((subject, index) => (
              <p key={subject + index}>{subject}</p>
            ))}
          </div>
          <p>Description: {release.description}</p>
          <p>Cover ID: {release.cover}</p>
          <p>ISBN: {release.isbn}</p>
          <p>Pages: {release.pages}</p>
          <p>Publisher: {release.publisher}</p>
          <p>Publish date: {release.publish_date}</p>
          <hr />
        </div>
      ))}
    </section>
  );
}
