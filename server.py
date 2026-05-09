from http.server import SimpleHTTPRequestHandler, HTTPServer
import webbrowser
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == '__main__':
    url = f'http://localhost:{PORT}/'
    with HTTPServer(('0.0.0.0', PORT), Handler) as httpd:
        print(f'Serving at {url}')
        webbrowser.open(url)
        httpd.serve_forever()
