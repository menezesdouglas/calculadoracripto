#!/usr/bin/env python3
import http.server
import json
import urllib.parse
import urllib.request

PORT = 8000
BINGX_BASE = "https://open-api.bingx.com/openApi/swap/v2/quote"


class Handler(http.server.SimpleHTTPRequestHandler):
    def send_response(self, code, message=None):
        super().send_response(code, message)
        self.send_header("Cache-Control", "no-cache")

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path.startswith("/api/bingx/quote/"):
            self.handle_bingx(parsed)
            return
        super().do_GET()

    def handle_bingx(self, parsed):
        parts = parsed.path.split("/")
        if len(parts) < 5:
            self.send_error(400, "Bad Request")
            return
        subpath = parts[4]
        qs = urllib.parse.parse_qs(parsed.query)
        symbol = qs.get("symbol", [""])[0]
        if not symbol:
            self.send_error(400, "Missing symbol")
            return
        url = f"{BINGX_BASE}/{subpath}?" + urllib.parse.urlencode({"symbol": symbol})
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=8) as resp:
                body = resp.read()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except Exception as exc:
            payload = json.dumps({"code": 502, "msg": str(exc)}).encode()
            self.send_response(502)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as server:
        print(f"Serving on port {PORT}")
        server.serve_forever()
