import { CopyURLButton } from "@/components/client/indexClient";

export default function LoadingBook() {
  return (
    <section className="flex flex-col gap-2 w-[100%] mt-[20px] font-garamond">
      <div className="flex flex-col items-center text-center gap-0.5 lg:py-10">
        <p className="font-courier uppercase h-5 lg:h-7 w-1/3 rounded bg-grey-3 animate-pulse" />
        <p className="h-11 lg:h-13 rounded w-2/3 bg-grey-3 animate-pulse" />
      </div>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-0 lg:justify-between">
        <div className="flex flex-col-reverse gap-2 lg:flex-row lg:w-3/4 lg: justify-between">
          <div className="lg:w-1/3">
            <div className="flex flex-col py-1 border-t-black border-t-[1px] border-b-black border-b-[1px]">
              <p className="font-courier uppercase text-sm">Author</p>
              <p className="text-[30px] h-11 rounded w-full bg-grey-3 animate-pulse" />
            </div>
            <div className="flex flex-col py-1 border-b-black border-b-[1px]">
              <p className="font-courier uppercase text-sm">Publisher</p>
              <p className="text-[30px] h-11 rounded w-full bg-grey-3 animate-pulse" />
            </div>
            <div className="flex flex-col py-1 border-b-black border-b-[1px]">
              <p className="font-courier uppercase text-sm">Info</p>
              <p className="text-[30px] h-11 rounded w-full bg-grey-3 animate-pulse" />
              <p className="text-[30px] h-11 rounded w-full bg-grey-3 animate-pulse" />
            </div>
            <div className="flex flex-col py-1 border-b-black border-b-[1px]">
              <p className="font-courier uppercase text-sm">Isbn</p>
              <p className="text-[30px] h-11 rounded w-full bg-grey-3 animate-pulse" />
            </div>
            <CopyURLButton />
          </div>
          <div className="content-center lg:w-2/3">
            <div className="self-center aspect-[3/4] w-[180px] rounded bg-grey-3 animate-pulse  mx-auto lg:w-[295px]" />
          </div>
        </div>
        <div className="border-t-black border-t-[1px] lg:w-1/4">
          <div className="py-1 border-b-black border-b-[1px]">
            <p className="font-courier uppercase text-sm">Cost</p>
            <p className="text-[30px] h-11 rounded w-full bg-grey-3 animate-pulse" />
          </div>
          <button className="py-2 text-[30px] w-[100%] text-left border-b-black border-b-[1px]">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-10 mb-10 h-40 rounded w-full bg-grey-3 animate-pulse lg:max-w-[900px] lg:mx-auto"></div>
    </section>
  );
}
