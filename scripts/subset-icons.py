import json
import os
import re
import sys
from fontTools.ttLib import TTFont

FONT = "public/fonts/MaterialSymbols.woff2"
OUT = "public/fonts/MaterialSymbols-subset.woff2"
tmp = os.environ["TEMP"]

NUMS = {"0": "zero", "1": "one", "2": "two", "3": "three", "4": "four",
        "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine"}


def spell_digits(name):
    return re.sub(r"\d", lambda m: NUMS[m.group(0)], name)


f = TTFont(FONT)
gsub = f["GSUB"].table
name2target = {}
components_by_key = {}
lu0 = gsub.LookupList.Lookup[0]
for st in lu0.SubTable:
    ls = st.ExtSubTable
    for first, liglist in ls.ligatures.items():
        for lig in liglist:
            text = first
            for c in lig.Component:
                text += c
            key = text.replace("underscore", "_")
            name2target[key] = lig.LigGlyph
            components_by_key[key] = [first] + list(lig.Component)

with open(os.path.join(tmp, "icons_all.txt")) as fh:
    icons = sorted({l.strip() for l in fh if l.strip()})

# Icons that don't exist in this font version, mapped to closest existing
ALIASES = {
    "chapter_add": "playlist_add",
}

missing = []
keep = set()
for i in icons:
    key = spell_digits(ALIASES.get(i, i))
    if key not in name2target:
        missing.append(i)
    else:
        keep.add(name2target[key])
        keep.update(components_by_key[key])

if missing:
    print("MISSING ICONS (ignored): %s" % ", ".join(missing))
keep.add(".notdef")

# Fermeture recursive des glyphes composites (composants de composants).
# NB: on ne RETIRE pas les glyphes superflus avec fontTools.subset : Chrome
# (decoder OTS) rejette tous les subsets produits par fontTools sur cette police
# (NetworkError, quelle que soit la config : tables var, GSUB, getGlyphs...).
# -> on garde la structure complete et on VIDE les glyphes inutiles : le fichier
#    passe de 390 Ko a ~135 Ko et OTS l'accepte.
from fontTools.ttLib.tables._g_l_y_f import Glyph

glyf = f["glyf"]
gorder = f.getGlyphOrder()
changed = True
while changed:
    changed = False
    for gn in list(keep):
        g = glyf[gn]
        if g.isComposite():
            for c in g.components:
                if c.glyphName not in keep:
                    keep.add(c.glyphName)
                    changed = True

empty = Glyph()
emptied = 0
names = set(gorder)
for gn in gorder:
    if gn not in keep:
        if glyf[gn] != empty:
            glyf[gn] = empty
        emptied += 1

ft = f
ft.flavor = "woff2"
ft.save(OUT)
print("saved", OUT, os.path.getsize(OUT), "bytes", "(kept %d, emptied %d)" % (len(keep), emptied))
