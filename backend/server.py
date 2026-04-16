"""
FC Safety Consultants — Local Python Server (optional)
======================================================
This file is ONLY needed if you want to self-host with Python/Flask.
For Vercel deployment, use the standard `npm run build` output — no Python needed.

Local usage:
  1. pip install flask
  2. npm run build          (creates dist/)
  3. python backend/server.py
  4. Open http://localhost:5000
"""

import os
from flask import Flask, send_from_directory

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
