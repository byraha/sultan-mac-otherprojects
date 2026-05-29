import http.server
import socketserver
import os

PORT = 8080
DIR = os.path.join(os.path.dirname(__file__), "site")

os.chdir(DIR)
handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("0.0.0.0", PORT), handler) as httpd:
    print(f"Serving SaqlainHUbGroup at http://0.0.0.0:{PORT}")
    httpd.serve_forever()
