import { NextResponse } from "next/server";
import { getOpenSourceData } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getOpenSourceData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
