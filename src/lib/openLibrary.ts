import { SearchBooksResults, SearchResult, Book } from "@/types";

const baseUrl: string = "https://openlibrary.org";

async function accessEdition(
  key: string,
  description: string,
  subjects: string[]
): Promise<{
  filledDescription: string;
  filledSubjects: string[];
  publish_date: string;
  publisher: string;
  isbn: string;
  pages: number;
}> {
  const res = await fetch(`${baseUrl + key}/editions.json`);
  const editionInfo = await res.json();
  const entries = Array.isArray(editionInfo.entries) ? editionInfo.entries : [];

  let filledDescription: string = description;
  let filledSubjects: string[] = [...subjects];
  let publish_date: string = "";
  let publisher: string = "";
  let isbn: string = "";
  let pages: number = -1;

  for (const entry of entries) {
    if (entry.description && filledDescription === "")
      filledDescription = entry.description
        ? typeof entry.description === "string"
          ? entry.description
          : entry.description.value
        : "";
    if (entry.subjects && filledSubjects.length === 0)
      filledSubjects = [...entry.subjects];

    if (!publish_date && "publish_date" in entry)
      publish_date = entry.publish_date;
    if (!publisher && "publishers" in entry) publisher = entry.publishers[0];
    if (pages === -1 && "number_of_pages" in entry)
      pages = entry.number_of_pages;

    if ("isbn_13" in entry || "isbn_10" in entry) {
      isbn = entry.isbn_13 ? entry.isbn_13[0] : entry.isbn_10[0];
      if ("publish_date" in entry) publish_date = entry.publish_date;
      if ("publishers" in entry) publisher = entry.publishers[0];
      if ("number_of_pages" in entry) pages = entry.number_of_pages;
    }

    if (publish_date !== "" && publisher !== "" && isbn !== "" && pages > 0)
      break;
  }

  return {
    filledDescription,
    filledSubjects,
    publish_date,
    publisher,
    isbn,
    pages,
  };
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

  const subjects: string[] = [];

  if ("subjects" in works) {
    for (const subject of works.subjects) {
      if (subjects.length === 3) break;
      if (subject.includes("(")) continue;
      const stringSubject =
        String(subject).charAt(0).toUpperCase() + String(subject).slice(1);

      if (subject.split(", ") === subject) subjects.push(stringSubject);
      else {
        subject.split(", ").forEach((sub: string) => {
          const stringSub =
            String(sub).charAt(0).toUpperCase() + String(sub).slice(1);

          if (subjects.length < 3) {
            subjects.push(stringSub);
          }
        });
      }
    }
  }

  return { description, subjects };
}

export async function clearResult(
  booksObj: SearchBooksResults,
  limit: number = 20
): Promise<Book[]> {
  const searchResult: SearchResult[] = booksObj.docs.slice(0, limit);

  const bookDetails = searchResult.map(async (result) => {
    const title: string = result.title;
    const author: string = result["author_name"]
      ? result["author_name"][0]
      : "";
    const id: string = result.key;
    const cover: number = result.cover_i;

    let { description, subjects } = await accessWorks(id);
    const {
      filledDescription,
      filledSubjects,
      publish_date,
      publisher,
      isbn,
      pages,
    } = await accessEdition(id, description, subjects);
    if (description === "") description = filledDescription;
    if (subjects.length === 0) subjects = [...filledSubjects];

    return {
      id,
      title,
      author,
      cover,
      description,
      publisher,
      publish_date,
      pages,
      isbn,
      subjects,
    };
  });

  const promisedBooks: Book[] = await Promise.all(bookDetails);
  const filteredBooksByCover: Book[] = promisedBooks.filter(
    (book) => book.cover
  );
  return filteredBooksByCover;
}

export async function searchBooks(query: string): Promise<SearchBooksResults> {
  const res = await fetch(`${baseUrl}/search.json?q=${query}`, {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error("Failed to fetch books in searchBooks");

  const booksObj: SearchBooksResults = await res.json();
  return booksObj;
}
