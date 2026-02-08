import type { Metadata } from "next";
import { getOpenSourceData } from "@/lib/github";
import { OpenSourceContent } from "./open-source-content";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Ahmad Yasser's open source contributions, pull requests, and GitHub activity.",
};

export default async function OpenSourcePage() {
  const data = await getOpenSourceData();
  return <OpenSourceContent data={data} />;
}
