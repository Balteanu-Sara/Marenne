import { searchBooks } from "@/lib/openLibrary";

export default async function NewReleases() {
  const newReleases = await searchBooks(
    "and+OR+the+OR+love&first_publish_year=2025"
  );

  return <section>New Releases</section>;
}
