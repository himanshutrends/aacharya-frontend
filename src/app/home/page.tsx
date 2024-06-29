import { Suspense } from "react";
import HomeSearch from "@/components/home/HomeScreen";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeSearch />
    </Suspense>
  );
}