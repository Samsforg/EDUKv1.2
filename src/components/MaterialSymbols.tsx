"use client";

import { useEffect } from "react";

const FONT_FACE_CSS = `
@font-face {
  font-family: 'Material Symbols Outlined';
  font-style: normal;
  font-weight: 100 700;
  font-display: swap;
  src: url(/fonts/MaterialSymbols.woff2) format('woff2');
}
`;

const STYLE_ID = "material-symbols-local-font";

export default function MaterialSymbols() {
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = FONT_FACE_CSS;
    document.head.appendChild(style);
  }, []);
  return null;
}
