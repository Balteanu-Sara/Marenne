export default function LoadingBooks({ len }: { len: number }) {
  return (
    <div className="flex flex-wrap justify-center">
      {Array.from({ length: len }).map((_, i) => {
        return (
          <div
            key={i}
            className="flex flex-col items-center m-3 w-[180px] gap-3"
          >
            <div className="aspect-[3/4] w-[180px] rounded bg-grey-3 animate-pulse" />
            <div className="h-4 rounded w-full bg-grey-3 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-grey-3 animate-pulse" />
          </div>
        );
      })}
    </div>
  );
}
