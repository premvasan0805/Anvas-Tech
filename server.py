"""Static server with clean URLs: /what-we-do -> what-we-do.html"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit, urlunsplit
import os
import sys

ROOT = Path(__file__).resolve().parent
os.chdir(ROOT)


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".svg": "image/svg+xml",
        ".woff2": "font/woff2",
        ".webp": "image/webp",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()

    def do_GET(self):
        self.path = self._rewrite(self.path)
        return super().do_GET()

    def do_HEAD(self):
        self.path = self._rewrite(self.path)
        return super().do_HEAD()

    def _rewrite(self, raw):
        parts = urlsplit(raw)
        path = unquote(parts.path)
        if path in ("", "/"):
            return raw
        name = Path(path.rstrip("/")).name
        if "." in name:
            return raw
        rel = path.strip("/")
        if not rel:
            return raw
        html = ROOT / f"{rel}.html"
        if html.is_file():
            return urlunsplit(("", "", f"/{rel}.html", parts.query, parts.fragment))
        return raw


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    httpd = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print(f"Serving {ROOT} on http://127.0.0.1:{port}", flush=True)
    httpd.serve_forever()
