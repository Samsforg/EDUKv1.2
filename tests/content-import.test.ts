import { normalizeImportRows, parseCsv } from "@/lib/content-import";

describe("parseCsv", () => {
  it("gère virgules entre guillemets, guillemets échappés et CRLF", () => {
    const rows = parseCsv('a,b,c\r\n"1,2","il dit ""bonjour""",3\r\n"x\ny",z,');
    expect(rows).toEqual([
      ["a", "b", "c"],
      ["1,2", 'il dit "bonjour"', "3"],
      ["x\ny", "z", ""],
    ]);
  });
});

describe("normalizeImportRows CSV", () => {
  it("normalise 2 lignes valides avec alias", () => {
    const csv = [
      "classe,matiere,chapitre,title,summary,content,ordre,duree_min,difficulte",
      '"2nde-G2","Comptabilité","Chap 1","Titre 1","Res","# Contenu",1,15,1',
      "Tle-B,Droit,Chap 2,Titre 2,,Contenu 2,2,,",
    ].join("\n");
    const res = normalizeImportRows("csv", csv);
    expect("rows" in res).toBe(true);
    if ("rows" in res) {
      expect(res.rows).toHaveLength(2);
      expect(res.rows[0]).toMatchObject({ classe: "2nde-G2", titre: "Titre 1", ordre: 1, duree_min: 15, difficulte: 1 });
      expect(res.rows[0].contenu).toContain("# Contenu");
      expect(res.rows[1].row).toBe(3);
    }
  });
  it("rejette colonnes inconnues", () => {
    const res = normalizeImportRows("csv", "classe,foo\n2nde-G2,bar");
    expect(res).toEqual({ error: expect.stringContaining("inconnues") });
  });
  it("signale lignes incomplètes", () => {
    const res = normalizeImportRows("csv", "classe,matiere,chapitre,titre,contenu\n2nde-G2,,,,");
    expect(res).toEqual({ error: expect.stringContaining("Ligne 2") });
  });
});

describe("normalizeImportRows JSON", () => {
  it("accepte un tableau valide", () => {
    const res = normalizeImportRows(
      "json",
      JSON.stringify([{ classe: "Tle-G2", matiere: "Informatique", chapitre: "C1", titre: "T1", contenu: "md" }]),
    );
    expect("rows" in res).toBe(true);
    if ("rows" in res) expect(res.rows[0].classe).toBe("Tle-G2");
  });
  it("rejette non-tableau et JSON invalide", () => {
    expect(normalizeImportRows("json", '{"a":1}')).toEqual({ error: expect.stringContaining("tableau") });
    expect(normalizeImportRows("json", "pas du json")).toEqual({ error: "JSON invalide" });
  });
  it("rejette format inconnu", () => {
    expect(normalizeImportRows("xml", "<a/>")).toEqual({ error: expect.stringContaining("Format invalide") });
  });
});
