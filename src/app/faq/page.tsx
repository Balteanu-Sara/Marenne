import { FaqSection } from "@/components/client/indexClient";

export default function Newsletter() {
  return (
    <main className="p-[15px] w-[100%] mt-5 mb-7 mx-auto max-w-[760px]">
      <p className="justify-self-center font-garamond text-4xl lg:text-5xl pb-[10px]">
        F.A.Q
      </p>

      <FaqSection />
    </main>
  );
}
