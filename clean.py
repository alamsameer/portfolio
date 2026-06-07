import os
import shutil

files_to_delete = [
    "index.html",
    "script.js",
    "style.css",
    "style.scss",
    "style.css.map",
    "a.txt",
    "README.md",
    "Ahbd.html",
    "CNAME"
]

dirs_to_delete = [
    "images",
    "public"
]

for f in files_to_delete:
    if os.path.exists(f):
        os.remove(f)
        print(f"Deleted file: {f}")

for d in dirs_to_delete:
    if os.path.exists(d):
        shutil.rmtree(d)
        print(f"Deleted directory: {d}")
