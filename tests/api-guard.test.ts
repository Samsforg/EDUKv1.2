import { guardApi, ApiError, handleApiCrash } from "@/lib/api-guard";

describe("api-guard", () => {
  it("laisse passer les réponses réussies inchangées", async () => {
    const ok = jest.fn(async () => {
      return new Response("ok", { status: 200 });
    });
    const res = await guardApi("GET /test", ok as any)(new Request("http://x") as any, {});
    expect(res.status).toBe(200);
    expect(ok).toHaveBeenCalledTimes(1);
  });

  it("convertit une erreur inattendue en 500 JSON", async () => {
    const errLog = jest.spyOn(console, "error").mockImplementation(() => {});
    const boom = jest.fn(async () => {
      throw new Error("sqlite explode");
    });
    const res = guardApi("GET /boom", boom as any)(new Request("http://x") as any, {});
    const body = await (await res).json();
    expect((await res).status).toBe(500);
    expect(body.error).toBe("Erreur interne du serveur");
    expect(errLog).toHaveBeenCalled();
    errLog.mockRestore();
  });

  it("préserve le statut d'une ApiError", async () => {
    const fail = jest.fn(async () => {
      throw new ApiError(404, "introuvable");
    });
    const res = await guardApi("GET /x", fail as any)(new Request("http://x") as any, {});
    expect(res.status).toBe(404);
  });

  it("handleApiCrash renvoie le statut de l'ApiError", async () => {
    const res = handleApiCrash(new ApiError(429, "trop de requêtes"), "POST /x");
    expect(res.status).toBe(429);
    expect(await res.json()).toMatchObject({ error: "trop de requêtes" });
  });

  it("handleApiCrash renvoie 500 générique pour une erreur inconnue", async () => {
    const errLog = jest.spyOn(console, "error").mockImplementation(() => {});
    const res = handleApiCrash(new Error("boom"));
    expect(res.status).toBe(500);
    expect(await res.json()).toMatchObject({ error: "Erreur interne du serveur" });
    errLog.mockRestore();
  });
});