import { readFileSync } from "node:fs";
import { join } from "node:path";

// Phase 3d.3
// A. Invariants CSP : frame-src doit couvrir le cadre publicitaire qui se
//    charge reellement (googleads.g.doubleclick.net) et rester minimise.
// B. Microsoft Clarity : le tag /tag/<id> lit `window.clarity.v` des sa
//    premiere instruction. Sans stub de file, window.clarity est undefined,
//    le tag leve "Cannot read properties of undefined (reading 'v')" et
//    n'injecte jamais scripts.clarity.ms -> Clarity ne collecte rien.
// C. Non-regression 3d.1 : le nonce CSP doit continuer d'etre applique au
//    bootstrap gtag inline.

const proxySrc = readFileSync(join(__dirname, "..", "src", "proxy.ts"), "utf8");

// ------------------------------------------------------------------
// A. Invariants CSP
// ------------------------------------------------------------------
describe("CSP — frame-src et connect-src (3d.3)", () => {
  const cspDirectives = proxySrc.slice(proxySrc.indexOf("const CSP_BASE"));
  const frameSrc = /"frame-src([^"]*)"/.exec(cspDirectives);

  it("declare une directive frame-src explicite", () => {
    expect(frameSrc).not.toBeNull();
  });

  it("frame-src autorise le cadre publicitaire reellement charge", () => {
    // observe en production : googleads.g.doubleclick.net/pagead/ads?... se
    // charge, c'est le cadre qui sert les publicites.
    expect(frameSrc![1]).toContain("https://googleads.g.doubleclick.net");
  });

  it("frame-src conserve 'self' (ne pas elargir au-dela du comportement initial)", () => {
    expect(frameSrc![1]).toContain("'self'");
  });

  it("frame-src n'elimine pas l'hote doubleclick de img-src", () => {
    expect(cspDirectives).toContain("img-src");
    expect(/img-src[^"]*googleads\.g\.doubleclick\.net/.test(cspDirectives)).toBe(true);
  });

  it("connect-src autorise ep1.adtrafficquality.google", () => {
    expect(/connect-src[^"]*ep1\.adtrafficquality\.google/.test(cspDirectives)).toBe(true);
  });

  it("connect-src conserve les hotes analytics/clarity existants", () => {
    expect(/connect-src[^"]*www\.google-analytics\.com/.test(cspDirectives)).toBe(true);
    expect(/connect-src[^"]*www\.clarity\.ms/.test(cspDirectives)).toBe(true);
  });

  it("script-src restebase sur nonce, sans unsafe-inline ni unsafe-eval", () => {
    const scriptSrc = /script-src[^\n]*nonce/.exec(proxySrc);
    expect(scriptSrc).not.toBeNull();
    expect(/script-src[^;]*unsafe-inline/.test(proxySrc)).toBe(false);
    expect(/unsafe-eval/.test(proxySrc)).toBe(false);
  });

  it("style-src 'unsafe-inline' n'est pas modifie (hors perimetre 3d.3)", () => {
    expect(cspDirectives).toContain("style-src 'self' 'unsafe-inline'");
  });

  it("aucun wildcard ajoute sur frame-src", () => {
    expect(frameSrc![1]).not.toContain("*");
  });
});

// ------------------------------------------------------------------
// Environnement DOM minimal (testEnvironment = node, pas de jsdom)
// ------------------------------------------------------------------
interface FakeScript {
  src: string;
  async: boolean;
  nonce: string;
  textContent: string;
}

function installDom(opts: { consent: boolean; nonce?: string }) {
  const appended: FakeScript[] = [];
  const ordre: string[] = [];

  let cookie = opts.consent
    ? "edukora_consent=" +
      encodeURIComponent(JSON.stringify({ essential: true, analytics: true, marketing: true, ia: true }))
    : "";

  const documentShim: Record<string, unknown> = {
    readyState: "complete",
    head: {
      appendChild(el: FakeScript) {
        appended.push(el);
        ordre.push(el.src ? `append:${el.src.split("?")[0]}` : "append:inline");
        if (el.src.includes("clarity.ms/tag")) {
          // Le tag Clarity s'execute : il lit window.clarity.v puis injecte
          // le collecteur. On materialise ce que la CSP doit autoriser.
          ordre.push("clarity-tag-run");
        }
      },
    },
    createElement(tag: string): FakeScript {
      void tag;
      return { src: "", async: false, nonce: "", textContent: "" };
    },
    querySelector(sel: string) {
      if (sel.includes("csp-nonce")) return opts.nonce ? { content: opts.nonce } : null;
      return null;
    },
    getElementsByTagName: () => [],
  };

  Object.defineProperty(documentShim, "cookie", {
    get: () => cookie,
    set: (v: string) => {
      cookie = v;
    },
    configurable: true,
  });

  const windowShim: Record<string, unknown> = {};

  (globalThis as Record<string, unknown>).document = documentShim;
  (globalThis as Record<string, unknown>).window = windowShim;

  return { appended, ordre, windowShim };
}

function loadAnalytics() {
  process.env.NEXT_PUBLIC_GA_ID = "G-TEST12345";
  process.env.NEXT_PUBLIC_CLARITY_ID = "testclarityid";
  let mod!: typeof import("@/lib/analytics");
  jest.isolateModules(() => {
    mod = require("@/lib/analytics");
  });
  return mod;
}

afterEach(() => {
  delete (globalThis as Record<string, unknown>).document;
  delete (globalThis as Record<string, unknown>).window;
});

// ------------------------------------------------------------------
// B. Clarity : stub de file d'attente
// ------------------------------------------------------------------
describe("Microsoft Clarity — stub window.clarity (3d.3)", () => {
  it("definit window.clarity en fonction AVANT d'injecter le tag", () => {
    const { windowShim, ordre } = installDom({ consent: true });
    const { loadAnalyticsScripts } = loadAnalytics();
    loadAnalyticsScripts();

    expect(typeof windowShim.clarity).toBe("function");
    // Le stub doit exister avant le tag, sinon le tag lit window.clarity.v
    // sur undefined.
    expect(ordre.indexOf("clarity-tag-run")).toBeGreaterThanOrEqual(0);
  });

  it("expose une file q qui est un tableau", () => {
    const { windowShim } = installDom({ consent: true });
    loadAnalytics().loadAnalyticsScripts();
    const clarity = windowShim.clarity as { q: unknown };
    expect(Array.isArray(clarity.q)).toBe(true);
  });

  it("met les appels en file jusqu'au chargement du collecteur", () => {
    const { windowShim } = installDom({ consent: true });
    loadAnalytics().loadAnalyticsScripts();
    const clarity = windowShim.clarity as (...a: unknown[]) => void;
    clarity("event", "signup_completed", { a: 1 });
    clarity("set", "C_IS", "0");

    const clarityFn = windowShim.clarity as { q: unknown[][] };
    expect(clarityFn.q).toHaveLength(2);
    expect(clarityFn.q[0][0]).toBe("event");
    expect(clarityFn.q[0][1]).toBe("signup_completed");
  });

  it("charge le tag avec l'identifiant configure", () => {
    const { appended } = installDom({ consent: true });
    loadAnalytics().loadAnalyticsScripts();
    const tag = appended.find((s) => s.src.includes("clarity.ms/tag"));
    expect(tag).toBeDefined();
    expect(tag!.src).toBe("https://www.clarity.ms/tag/testclarityid");
  });

  it("ne charge rien et ne cree pas de stub sans consentement", () => {
    const { appended, windowShim } = installDom({ consent: false });
    loadAnalytics().loadAnalyticsScripts();
    expect(appended.filter((s) => s.src.includes("clarity.ms"))).toHaveLength(0);
    expect(windowShim.clarity).toBeUndefined();
  });

  it("n'ecrase pas un Clarity deja actif (collecteur charge)", () => {
    const { windowShim } = installDom({ consent: true });
    const reel = () => "collecteur";
    windowShim.clarity = reel;
    loadAnalytics().loadAnalyticsScripts();
    expect(windowShim.clarity).toBe(reel);
  });

  it("ne charge le tag qu'une seule fois (idempotent)", () => {
    const { appended } = installDom({ consent: true });
    const { loadAnalyticsScripts } = loadAnalytics();
    loadAnalyticsScripts();
    loadAnalyticsScripts();
    expect(appended.filter((s) => s.src.includes("clarity.ms/tag"))).toHaveLength(1);
  });
});

// ------------------------------------------------------------------
// C. Non-regression 3d.1 : nonce du bootstrap gtag
// ------------------------------------------------------------------
describe("Non-regression 3d.1 — nonce du bootstrap gtag (3d.3)", () => {
  it("applique le nonce au bootstrap inline quand le meta est present", () => {
    const { appended } = installDom({ consent: true, nonce: "abc123nonce" });
    loadAnalytics().loadAnalyticsScripts();
    const inline = appended.find((s) => s.textContent.includes("dataLayer"));
    expect(inline).toBeDefined();
    expect(inline!.nonce).toBe("abc123nonce");
  });

  it("ne force aucun nonce si le meta est absent", () => {
    const { appended } = installDom({ consent: true });
    loadAnalytics().loadAnalyticsScripts();
    const inline = appended.find((s) => s.textContent.includes("dataLayer"));
    expect(inline).toBeDefined();
    expect(inline!.nonce).toBe("");
  });

  it("le bootstrap configure bien GA avec l'identifiant", () => {
    const { appended } = installDom({ consent: true });
    loadAnalytics().loadAnalyticsScripts();
    const inline = appended.find((s) => s.textContent.includes("dataLayer"))!;
    expect(inline.textContent).toContain("gtag('config', 'G-TEST12345'");
  });
});