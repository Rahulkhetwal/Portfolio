import os
import sys
import subprocess
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading

def run_build():
    print("Building the React app...")
    try:
        subprocess.run(["npm", "run", "build"], check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Build failed with error: {e}")
        return False

def run_server(port=8000):
    print(f"Starting server at http://localhost:{port}")
    os.chdir('dist')
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    webbrowser.open(f'http://localhost:{port}')
    httpd.serve_forever()

def main():
    # Check if dist exists, if not, run build
    if not os.path.exists('dist'):
        print("Dist directory not found. Running build...")
        if not run_build():
            sys.exit(1)
    
    # Start the server
    try:
        run_server()
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
