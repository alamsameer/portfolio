import os
import shutil

backup_dir = "backup_portfolio"
if not os.path.exists(backup_dir):
    os.makedirs(backup_dir)

files_to_backup = [
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

dirs_to_backup = [
    "images",
    "public"
]

for f in files_to_backup:
    if os.path.exists(f):
        shutil.copy2(f, os.path.join(backup_dir, f))
        print(f"Backed up file: {f}")

for d in dirs_to_backup:
    if os.path.exists(d):
        dest_d = os.path.join(backup_dir, d)
        if os.path.exists(dest_d):
            shutil.rmtree(dest_d)
        shutil.copytree(d, dest_d)
        print(f"Backed up directory: {d}")
