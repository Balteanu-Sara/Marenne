import { SearchBooksResults, SearchResult, Book } from "@/types";

const baseUrl: string = "https://openlibrary.org";

async function accessEdition(
  key: string,
  description: string,
  subjects: string[]
): Promise<{
  publish_date: string;
  publisher: string;
  isbn: number;
  pages: number;
}> {
  const res = await fetch(`${baseUrl + key}/editions.json`);
  const editionInfo = await res.json();
  const entries = editionInfo.entries;

  let filledDescription: string = description;
  let filledSubjects: string[] = subjects;
  let publish_date: string = "";
  let publisher: string = "";
  let isbn: number = -1;
  let pages: number = -1;

  for (const entry of entries) {
    if (entry.description && filledDescription === "")
      filledDescription = entry.description;
    if (entry.subjects && filledSubjects.length === 0)
      filledSubjects = entry.subjects;

    if (publish_date !== "" || publisher !== "" || isbn || pages) break;
    if ("publish_date" in entry) publish_date = entry.publish_date;
    if ("publishers" in entry) publisher = entry.publishers[0];
    if ("number_of_pages" in entry) pages = entry.publishers[0];
    if ("isbn_13" in entry || "isbn_10" in entry) {
      isbn = entry.isbn_13 ? entry.isbn_13 : entry.isbn_10;
      if ("publish_date" in entry) publish_date = entry.publish_date;
      if ("publishers" in entry) publisher = entry.publishers[0];
      if ("number_of_pages" in entry) pages = entry.publishers[0];
    }
  }

  return { publish_date, publisher, isbn, pages };
}

async function accessWorks(
  key: string
): Promise<{ description: string; subjects: string[] }> {
  const res = await fetch(`${baseUrl + key}.json`);
  const works = await res.json();

  const description: string = works.description
    ? typeof works.description === "string"
      ? works.description
      : works.description.value
    : "";

  const subjects: string[] = works.subjects ? works.subjects : [];

  return { description, subjects };
}

async function clearResult(books: SearchBooksResults): Promise<Book[]> {
  const searchResult: SearchResult[] = books.docs;
  const booksDetails: Book[] = [];
  for (const result of searchResult) {
    const title: string = result.title;
    const author: string[] = result["author_name"] ? result["author_name"] : [];
    const id: string = result.key;
    const cover: number = result.cover_i;

    const { description, subjects } = await accessWorks(id);
    const { publish_date, publisher, isbn, pages } = await accessEdition(
      id,
      description,
      subjects
    );
  }
  return booksDetails;
}

export async function searchBooks(query: string): Promise<Book[]> {
  const res = await fetch(
    `${baseUrl}/search.json?q=${encodeURIComponent(query)}`,
    { cache: "force-cache" }
  );

  if (!res.ok) throw new Error("Failed to fetch books in searchBooks");

  const books: SearchBooksResults = await res.json();
  return clearResult(books);
}
