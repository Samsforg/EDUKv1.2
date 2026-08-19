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
needed = set()
for i in icons:
    key = spell_digits(ALIASES.get(i, i))
    if key not in name2target:
        missing.append(i)
    else:
        needed.add(name2target[key])
        needed.update(components_by_key[key])

if missing:
    print("MISSING ICONS (ignored): %s" % ", ".join(missing))
needed.add(".notdef")

from fontTools import subset

options = subset.Options()
options.output_file = OUT
options.flavor = "woff2"
options.layout_features = ["rlig", "rclt"]
options.name_IDs = ["*"]
options.drop_tables = []
options.ignore_missing_glyphs = True
options.hinting = False

subsetter = subset.Subsetter(options)
ft = TTFont(FONT)
subsetter.populate(unicodes=[], glyphs=needed)
subsetter.subset(ft)
ft.flavor = "woff2"
ft.save(OUT)
print("saved", OUT, os.path.getsize(OUT), "bytes")
