"use client";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "#ffffff",
            color: "#111827",
            fontFamily:
              "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
            textAlign: "center",
          }}
        >
          <main style={{ maxWidth: "28rem", width: "100%" }}>
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
                lineHeight: 1,
              }}
            >
              📚
            </div>
            <h1
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                margin: "0 0 0.5rem",
              }}
            >
              Une erreur est survenue
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                margin: "0 0 1.5rem",
                color: "#6b7280",
              }}
            >
              Un problème inattendu a empêché l&apos;affichage de cette page.
              Veuillez réessayer.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={retry}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "9999px",
                  border: "none",
                  backgroundColor: "#0047ab",
                  color: "#ffffff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Réessayer
              </button>
              <a
                href="/"
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "9999px",
                  color: "#0047ab",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Retour à l&apos;accueil
              </a>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
