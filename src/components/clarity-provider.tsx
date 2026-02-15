"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initClarity, tagSession } from "@/lib/clarity";

export function ClarityProvider({ projectId }: { projectId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    initClarity(projectId);
  }, [projectId]);

  useEffect(() => {
    tagSession("page", pathname);
  }, [pathname]);

  return null;
}
