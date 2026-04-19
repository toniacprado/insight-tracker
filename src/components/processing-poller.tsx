"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ProcessingPoller({ active }: { active: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!active) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.refresh();
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [active, router]);

  return null;
}
