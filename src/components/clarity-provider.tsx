"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initClarity, tagSession } from "@/lib/clarity";

export function ClarityProvider() {
  const pathname = usePathname();

  useEffect(() => {
    initClarity();
  }, []);

  useEffect(() => {
    tagSession("page", pathname);
  }, [pathname]);

  return null;
}
