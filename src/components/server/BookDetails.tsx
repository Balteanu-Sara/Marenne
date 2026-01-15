import { clearResult, searchBooks } from "@/lib/openLibrary";
import Image from "next/image";

export default async function BookDetails({ id }: { id: string }) {
  const bookJson = await searchBooks(`/works/${id}`);
  const book = await clearResult(bookJson);
  console.log("id:", book.id);
  console.log("title:", book.title);
  console.log("author:", book.author);
  console.log("description:", book.description);
  console.log("publisher:", book.publisher);
  console.log("publish_date:", book.publish_date);
  console.log("pages:", book.pages);
  console.log("isbn:", book.isbn);
  console.log("subjects:", book.subjects);

  return (
    <section>
      <div className="flex flex-col justify-center">
        subiecte
        <div className="font-garamond">titlu</div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col-reverse">
          <div>info</div>
          <div>poza</div>
        </div>
        <div>pret & buton de cart</div>
      </div>
    </section>
  );
}
