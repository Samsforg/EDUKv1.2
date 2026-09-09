"use client";

import { useEffect, useState } from "react";

export default function CookiePreferencesClient() {
  const STORAGE_KEY = "edukora_cookie_prefs";
  const DEFAULTS = { analytics: false, marketing: false, ia: false, essential: true };

  function applyPrefs(prefs: { essential: boolean; analytics: boolean; marketing: boolean; ia: boolean }) {
    const analyticsToggle = document.getElementById("toggle_analytics") as HTMLInputElement;
    const iaToggle = document.getElementById("toggle_ia") as HTMLInputElement;
    if (analyticsToggle) analyticsToggle.checked = !!prefs.analytics;
    if (iaToggle) iaToggle.checked = !!prefs.ia;
    document.querySelectorAll<HTMLInputElement>(".toggle-checkbox").forEach((cb) => {
      if (!cb.disabled && cb.checked) {
        const dot = cb.nextElementSibling?.querySelector(".toggle-dot") as HTMLElement;
        if (dot) dot.style.transform = "translateX(1.25rem)";
        const label = cb.nextElementSibling as HTMLElement;
        if (label) label.style.backgroundColor = cb.id === "toggle_ia" ? "#00327d" : "#0047ab";
      }
    });
  }

  function savePrefs(prefs: { essential: boolean; analytics: boolean; marketing: boolean; ia: boolean }) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    document.cookie = "edukora_consent=" + encodeURIComponent(JSON.stringify(prefs)) + ";path=/;max-age=15552000;samesite=lax";
  }

  function collectPrefs() {
    const analyticsToggle = document.getElementById("toggle_analytics") as HTMLInputElement;
    const iaToggle = document.getElementById("toggle_ia") as HTMLInputElement;
    return {
      essential: true,
      analytics: analyticsToggle?.checked ?? false,
      marketing: iaToggle?.checked ?? false,
      ia: iaToggle?.checked ?? false,
    };
  }

  function showToast(btn: HTMLButtonElement, text: string) {
    btn.classList.add("opacity-80");
    const original = btn.innerText;
    btn.innerText = text;
    setTimeout(() => {
      btn.innerText = original;
      btn.classList.remove("opacity-80");
    }, 1500);
  }

  useEffect(() => {
    let prefs;
    try {
      prefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || DEFAULTS;
    } catch {
      prefs = DEFAULTS;
    }
    applyPrefs(prefs);

    const toggles = document.querySelectorAll(".toggle-checkbox");
    toggles.forEach((toggle) => {
      if (!toggle.hasAttribute("data-listener")) {
        toggle.setAttribute("data-listener", "true");
        toggle.addEventListener("change", function (this: HTMLInputElement) {
          const dot = this.nextElementSibling?.querySelector(".toggle-dot") as HTMLElement;
          if (this.checked) {
            if (dot) dot.style.transform = "translateX(1.25rem)";
            const label = this.nextElementSibling as HTMLElement;
            if (label) label.style.backgroundColor = this.id === "toggle_ia" ? "#00327d" : "#0047ab";
          } else {
            if (dot) dot.style.transform = "translateX(0.125rem)";
            const label = this.nextElementSibling as HTMLElement;
            if (label) label.style.backgroundColor = "#c3c6d5";
          }
        });
      }
    });

    const acceptAllBtn = document.getElementById("acceptAllBtn") as HTMLButtonElement;
    const saveSelectionBtn = document.getElementById("saveSelectionBtn") as HTMLButtonElement;

    if (acceptAllBtn && !acceptAllBtn.hasAttribute("data-listener")) {
      acceptAllBtn.setAttribute("data-listener", "true");
      acceptAllBtn.addEventListener("click", () => {
        prefs = { essential: true, analytics: true, marketing: true, ia: true };
        applyPrefs(prefs);
        savePrefs(prefs);
        showToast(acceptAllBtn, "C'est noté !");
      });
    }

    if (saveSelectionBtn && !saveSelectionBtn.hasAttribute("data-listener")) {
      saveSelectionBtn.setAttribute("data-listener", "true");
      saveSelectionBtn.addEventListener("click", () => {
        prefs = collectPrefs();
        savePrefs(prefs);
        showToast(saveSelectionBtn, "Choix enregistrés !");
      });
    }
  }, []);

  return null;
}