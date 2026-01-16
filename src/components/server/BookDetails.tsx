import { clearResult, searchBooks } from "@/lib/openLibrary";
import Image from "next/image";
import { BookDescription } from "@/components/client/indexClient";
import CopyURLButton from "@/components/client/CopyURLButton";

export default async function BookDetails({ id }: { id: string }) {
  const bookJson = await searchBooks(`/works/${id}`);
  const book = await clearResult(bookJson);

  return (
    <section className="flex flex-col gap-2 w-[100%] mt-[15px] font-garamond">
      <div className="flex flex-col items-center text-center gap-0.5">
        {book.subjects && (
          <p className="font-courier uppercase text-sm">
            {book.subjects.join()}
          </p>
        )}
        <p className="text-4xl">{book.title}</p>
      </div>
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col-reverse gap-2 lg:flex-row">
          <div>
            <div className="flex flex-col py-1 border-t-black border-t-[1px] border-b-black border-b-[1px]">
              <p className="font-courier uppercase text-sm">Author</p>
              <p className="text-[30px] min-h-11">{book.author ?? "Unnamed"}</p>
            </div>
            <div className="flex flex-col py-1 border-b-black border-b-[1px]">
              <p className="font-courier uppercase text-sm">Publisher</p>
              <p className="text-[30px] min-h-11">{book.publisher}</p>
            </div>
            <div className="flex flex-col py-1 border-b-black border-b-[1px]">
              <p className="font-courier uppercase text-sm">Info</p>
              <p className="text-[30px] h-11">{book.pages} pages</p>
              <p className="text-[30px] h-11">{book.publish_date}</p>
            </div>
            <div className="flex flex-col py-1 border-b-black border-b-[1px]">
              <p className="font-courier uppercase text-sm">Isbn</p>
              <p className="text-[30px] h-11">{book.isbn}</p>
            </div>
            <CopyURLButton />
          </div>
          <Image
            src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
            width={180}
            height={275}
            alt={`Cover book for ${book.title}`}
            className="self-center w-[180px] h-[275px]"
            // className="w-auto h-auto border-1 border-black border-solid"
          />
        </div>
        <div className="border-t-black border-t-[1px] border-b-black border-b-[1px]">
          <div className="py-1 border-b-black border-b-[1px]">
            <p className="font-courier uppercase text-sm">Cost</p>
            <p className="text-[30px] h-11">$10.75</p>
          </div>
          <button className="py-2 text-[30px]">Add to Cart</button>
        </div>
      </div>
      {book.description && <BookDescription description={book.description} />}
    </section>
  );
}
