"""
FC Safety Consultants — Local Python Server
=============================================
Run this file to serve the built website locally.

Prerequisites:
  1. pip install flask
  2. In the Lovable project root, run: npm run build
     (This creates a 'dist' folder with the production build)
  3. Copy the 'dist' folder into the same directory as this file,
     OR update DIST_DIR below to point to your build output.
  4. Run: python server.py
  5. Open http://localhost:5000 in your browser.
"""

import os
from flask import Flask, send_from_directory

# Path to the Vite production build output
DIST_DIR = os.path.join(os.path.dirname(__file__), "..", "dist")

app = Flask(__name__, static_folder=DIST_DIR, static_url_path="")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path: str):
    """Serve the React SPA — falls back to index.html for client-side routing."""
    full_path = os.path.join(app.static_folder, path)
    if path and os.path.isfile(full_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    print("✅ FC Safety Consultants running at http://localhost:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)
