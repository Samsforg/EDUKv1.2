import fs from "node:fs";

const tscOut = fs.readFileSync(process.argv[2], "utf8");
const byFile = new Map();

for (const line of tscOut.split("\n")) {
  const m = /^([^(]+)\((\d+),(\d+)\): error TS1308/.exec(line);
  if (!m) continue;
  const file = m[1];
  const ln = parseInt(m[2], 10);
  const col = parseInt(m[3], 10);
  if (!byFile.has(file)) byFile.set(file, []);
  byFile.get(file).push({ ln, col });
}

function scanString(line, j) {
  const q = line[j];
  j++;
  while (j < line.length) {
    if (line[j] === "\\") { j += 2; continue; }
    if (line[j] === q) { j++; break; }
    j++;
  }
  return j;
}

function scanTemplate(line, j) {
  j++;
  while (j < line.length) {
    const c = line[j];
    if (c === "\\") j += 2;
    else if (c === "`") return j + 1;
    else if (c === "$" && line[j + 1] === "{") {
      j += 2;
      let d = 1;
      while (j < line.length && d > 0) {
        const cc = line[j];
        if (cc === "'" || cc === '"') j = scanString(line, j) - 1;
        else if (cc === `{`) d++;
        else if (cc === "}") d--;
        j++;
      }
    } else j++;
  }
  return j;
}

function skipPastToken(line, j, open, close) {
  if (line[j] !== open) return j;
  let d = 0;
  while (j < line.length) {
    const c = line[j];
    if (c === "'" || c === '"') { j = scanString(line, j) - 1; }
    else if (c === "`") { j = scanTemplate(line, j) - 1; }
    else if (c === open) d++;
    else if (c === close) { d--; if (d === 0) return j + 1; }
    j++;
  }
  return j;
}

function findFnKeyword(line) {
  const m = /\bfunction\b/.exec(line);
  if (!m) return -1;
  let k = m.index - 1;
  while (k >= 0 && /\s/.test(line[k])) k--;
  if (k >= 0 && (line[k] === "." || line[k] === "]")) return -1;
  return m.index;
}

function fnBodySpans(lines, defLine, fnIdx, errLine, errCol) {
  let i = defLine;
  let line = lines[i];
  const openParen = line.indexOf("(", fnIdx + 8);
  let j;
  if (openParen === -1) {
    j = fnIdx + 8;
  } else {
    let depth = 0;
    let k = openParen;
    while (i < lines.length) {
      const ln = lines[i];
      while (k < ln.length) {
        const c = ln[k];
        if (c === "'" || c === '"') { k = scanString(ln, k); continue; }
        if (c === "`") { k = scanTemplate(ln, k); continue; }
        if (c === "(") depth++;
        else if (c === ")") { depth--; if (depth === 0) { k++; break; } }
        k++;
      }
      if (depth === 0) break;
      i++;
      k = 0;
    }
    if (depth !== 0) return errLine - 1 === defLine;
    j = k;
  }
  let br = -1;
  for (; i < lines.length; i++) {
    const ln = lines[i];
    br = ln.indexOf("{", i === defLine ? j : 0);
    if (br !== -1) break;
  }
  if (br === -1) return errLine - 1 === defLine;
  let depth = 0;
  let started = false;
  for (; i < lines.length; i++) {
    line = lines[i];
    const start = (i === defLine) ? br : 0;
    for (let k = start; k < line.length; k++) {
      const c = line[k];
      if (c === "'" || c === '"') { k = scanString(line, k) - 1; continue; }
      if (c === "`") { k = scanTemplate(line, k) - 1; continue; }
      if (c === "{") { depth++; started = true; }
      else if (c === "}") {
        if (!started && depth === 0) return false;
        if (depth === 0) return false;
        depth--;
      }
      if (i === errLine - 1 && (i > defLine || k >= errCol - 1)) return started && depth > 0;
    }
    if (started && depth === 0) return false;
  }
  return false;
}

function findArrow(line) {
  return findArrowAt(line, 0);
}

function findArrowAt(line, from) {
  for (let i = from; i < line.length; i++) {
    const c = line[i];
    if (c === "'" || c === '"') { i = scanString(line, i) - 1; continue; }
    if (c === "`") { i = scanTemplate(line, i) - 1; continue; }
    if (c === "=" && line[i + 1] === ">") return i;
  }
  return -1;
}

function arrowBodySpans(lines, defLine, arrowIdx, errLine, errCol) {
  let i = defLine;
  let line = lines[i];
  let j = arrowIdx + 2;
  while (j < line.length && /\s/.test(line[j])) j++;
  if (j >= line.length || line[j] !== "{") {
    if (line[j] === "(") {
      let depth = 0;
      let k = j;
      while (i < lines.length) {
        const ln = lines[i];
        while (k < ln.length) {
          const cc = ln[k];
          if (cc === "'" || cc === '"') { k = scanString(ln, k); continue; }
          if (cc === "`") { k = scanTemplate(ln, k); continue; }
          if (cc === "(") depth++;
          else if (cc === ")") { depth--; if (depth === 0) { k++; break; } }
          k++;
        }
        if (depth === 0) break;
        i++;
        k = 0;
      }
      if (errLine - 1 > defLine) return errLine - 1 <= i;
    }
    return errLine - 1 === defLine && errCol - 1 > arrowIdx + 2;
  }
  let depth = 0;
  let started = false;
  for (; i < lines.length; i++) {
    line = lines[i];
    const start = (i === defLine) ? j : 0;
    for (let k = start; k < line.length; k++) {
      const c = line[k];
      if (c === "'" || c === '"') { k = scanString(line, k) - 1; continue; }
      if (c === "`") { k = scanTemplate(line, k) - 1; continue; }
      if (c === "{") { depth++; started = true; }
      else if (c === "}") {
        if (!started) return false;
        if (depth === 0) return false;
        depth--;
      }
      if (i === errLine - 1 && (i > defLine || k >= errCol - 1)) return depth > 0;
    }
    if (started && depth === 0) return false;
  }
  return false;
}

function findArrowInsert(line, arrowIdx) {
  const before = line.slice(0, arrowIdx);
  const trimmed = before.replace(/\s+$/, "");
  let j = trimmed.length - 1;
  if (trimmed.endsWith(")")) {
    let d = 0;
    while (j >= 0) {
      const ch = trimmed[j];
      if (ch === ")") d++;
      else if (ch === "(") { d--; if (d === 0) return j; }
      j--;
    }
    return trimmed.indexOf("(");
  }
  while (j >= 0) {
    const ch = trimmed[j];
    if (ch === "'" || ch === '"') { j = scanStringRev(trimmed, j) - 1; continue; }
    if (ch === "]" || ch === "}" || ch === ")") {
      let d = 1;
      j--;
      while (j >= 0 && d > 0) {
        if (trimmed[j] === ch) d++;
        else if (trimmed[j] === ({"]":"[","}":"{",")":"("}[ch] || "")) d--;
        j--;
      }
      continue;
    }
    if (ch === ")") {
      let d = 1;
      j--;
      while (j >= 0 && d > 0) {
        if (trimmed[j] === ")") d++;
        else if (trimmed[j] === "(") d--;
        j--;
      }
      return j + 1;
    }
    j--;
  }
  return trimmed.indexOf("(");
}

function scanStringRev(s, j) {
  const q = s[j];
  j--;
  while (j >= 0 && s[j] !== q) { if (s[j] === "\\") j--; j--; }
  return j >= 0 ? j : 0;
}

function findEnclosing(lines, errLine, errCol) {
  for (let i = errLine - 1; i >= 0; i--) {
    const line = lines[i];
    const fnIdx = findFnKeyword(line);
    if (fnIdx !== -1) {
      if (fnBodySpans(lines, i, fnIdx, errLine, errCol)) {
        const asyncIdx = line.lastIndexOf("async", fnIdx);
        const already = asyncIdx !== -1 && line.slice(asyncIdx, asyncIdx + 5) === "async" && (asyncIdx === 0 || /\W/.test(line[asyncIdx - 1])) && /\s/.test(line[asyncIdx + 5] || " ");
        return { line: i, kind: "function", insertAt: fnIdx, already };
      }
      continue;
    }
    const aIdx = findArrow(line);
    if (aIdx !== -1) {
      const arrows = [];
      let from = 0;
      while (true) {
        const a = findArrowAt(line, from);
        if (a === -1) break;
        arrows.push(a);
        from = a + 2;
      }
      for (let ai = arrows.length - 1; ai >= 0; ai--) {
        const ar = arrows[ai];
        if (errLine - 1 === i && errCol - 1 > ar + 2) {
          return { line: i, kind: "arrow", insertAt: findArrowInsert(line, ar) };
        }
        if (arrowBodySpans(lines, i, ar, errLine, errCol)) {
          return { line: i, kind: "arrow", insertAt: findArrowInsert(line, ar) };
        }
      }
    }
  }
  return null;
}

for (const [file, errs] of byFile) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split("\n");
  const targets = new Map();
  for (const e of errs) {
    try {
      const t = findEnclosing(lines, e.ln, e.col);
      if (t) targets.set(t.line, t);
    } catch (err) {
      console.log(`WARN ${file}: parse error at line ${e.ln}: ${err.message}`);
    }
  }
  const edits = [...targets.values()].sort((a, b) => b.line - a.line);
  let changed = false;
  for (const t of edits) {
    const line = lines[t.line];
    if (t.kind === "function") {
      if (t.already) continue;
      lines[t.line] = line.slice(0, t.insertAt) + "async " + line.slice(t.insertAt);
    } else {
      const before = line.slice(0, t.insertAt);
      if (/\basync\s+$/.test(before)) continue;
      lines[t.line] = line.slice(0, t.insertAt) + "async " + line.slice(t.insertAt);
    }
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, lines.join("\n"));
    console.log(`${file}: ${edits.length} fonction(s) passée(s) en async`);
  }
}
