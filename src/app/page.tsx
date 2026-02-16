import dynamic from "next/dynamic";
import { Hero } from "@/components/home/hero";

const Testimonials = dynamic(
  () => import("@/components/home/testimonials").then(mod => ({ default: mod.Testimonials })),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
    </>
  );
}
