import Button from "@/components/Button";
import {
  Recommended,
  NewReleases,
  MoreOn,
  BestSellers,
  BackInStock,
} from "@/components/server/indexServer";

export default function Home() {
  return (
    <main className="p-[15px]">
      <Recommended />
      <NewReleases />
      <MoreOn />
      <BestSellers />
      <BackInStock />
    </main>
  );
}
