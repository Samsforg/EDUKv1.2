"use client";

import { useEffect } from "react";
import "@/lib/csrf-client";
import { getCsrfToken } from "@/lib/csrf-core";

export default function CsrfInit() {
  useEffect(() => {
    getCsrfToken();
  }, []);

  return null;
}
