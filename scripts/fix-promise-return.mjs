import fs from "node:fs";

const tscOut = fs.readFileSync(process.argv[2], "utf8");
const byFile = new Map();

for (const line of tscOut.split("\n")) {
  const m = /^([^(]+)\((\d+),(\d+)\): error TS1064/.exec(line);
  if (!m) continue;
  const file = m[1];
  const ln = parseInt(m[2], 10);
  const col = parseInt(m[3], 10);
  if (!byFile.has(file)) byFile.set(file, []);
  byFile.get(file).push({ ln, col });
}

const OPEN = { "(": ")", "[": "]", "{": "}", "<": ">" };

function findTypeEnd(lines, startL, startC) {
  const stack = [];
  let lineIdx = startL;
  let line = lines[lineIdx];
  if (!line) return null;
  let i = startC;
  let started = false;
  let braceOpen = false;
  let braceClosed = false;
  let prevChar = "";
  while (lineIdx < lines.length) {
    while (i < line.length) {
      const c = line[i];
      const n = line[i + 1];
      if (!started && !/\s/.test(c)) {
        started = true;
        if (c === "{") braceOpen = true;
      }
      if (!/\s/.test(c)) prevChar = c;
      if (c === '"' || c === "'" || c === "`") {
        const q = c;
        i++;
        while (i < line.length && line[i] !== q) {
          if (line[i] === "\\") i++;
          i++;
        }
        i++;
        continue;
      }
      if (c === "(" || c === "[" || c === "<") {
        stack.push({ "(": ")", "[": "]", "<": ">" }[c]);
        i++;
        continue;
      }
      if (c === ")" || c === "]" || c === ">") {
        if (stack.length > 0 && stack[stack.length - 1] === c) {
          stack.pop();
          if (stack.length === 0 && braceOpen) braceClosed = true;
        }
        i++;
        continue;
      }
      if (c === "{") {
        if (stack.length > 0 || (braceOpen && !braceClosed) || prevChar === "|") {
          stack.push("}");
          i++;
          continue;
        }
        return { line: lineIdx, col: i };
      }
      if (c === "}") {
        if (stack.length > 0 && stack[stack.length - 1] === "}") {
          stack.pop();
          if (stack.length === 0 && braceOpen) braceClosed = true;
        }
        i++;
        continue;
      }
      if (stack.length === 0) {
        if (c === ">" && n === "=") return { line: lineIdx, col: i };
      }
      i++;
    }
    lineIdx++;
    line = lines[lineIdx];
    i = 0;
  }
  return null;
}

for (const [file, errs] of byFile) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  let changed = false;
  for (const { ln, col } of errs) {
    const startL = ln - 1;
    const startC = col - 1;
    const line = lines[startL];
    if (!line) continue;
    const end = findTypeEnd(lines, startL, startC);
    if (!end) {
      console.log(`SKIP ${file}:${ln} (fin de type introuvable)`);
      continue;
    }
    if (end.line === startL) {
      lines[startL] =
        line.slice(0, startC) +
        "Promise<" +
        line.slice(startC, end.col) +
        ">" +
        line.slice(end.col);
    } else {
      lines[startL] = line.slice(0, startC) + "Promise<" + line.slice(startC);
      lines[end.line] =
        lines[end.line].slice(0, end.col) + ">" + lines[end.line].slice(end.col);
    }
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, lines.join("\n"));
    console.log(`${file}: ${errs.length} retour(s) Promise<...> corrigé(s)`);
  }
}
