import { NewsletterSection } from "@/components/client/indexClient";

export default function Newsletter() {
  return (
    <main className="p-[15px] w-[100%] mt-4 mx-auto max-w-[760px]">
      <p className="text-center font-garamond text-3xl lg:text-5xl pb-[10px]">
        Newsletter
      </p>

      <NewsletterSection />
    </main>
  );
}
