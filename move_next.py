import os
import shutil

src_dir = "temp-next-app"
dest_dir = "."

if os.path.exists(src_dir):
    # Move all files and subdirectories
    for item in os.listdir(src_dir):
        s = os.path.join(src_dir, item)
        d = os.path.join(dest_dir, item)
        if os.path.exists(d):
            if os.path.isdir(d):
                shutil.rmtree(d)
            else:
                os.remove(d)
        shutil.move(s, d)
        print(f"Moved {item} to root.")
    
    # Remove the empty temp directory
    shutil.rmtree(src_dir)
    print("Cleaned up temp-next-app directory.")
else:
    print("temp-next-app directory not found!")
