from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import webbrowser
import threading

def run_server(port=8000):
    os.chdir('dist')
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f"Serving at http://localhost:{port}")
    webbrowser.open(f'http://localhost:{port}')
    httpd.serve_forever()

if __name__ == '__main__':
    # Check if dist directory exists
    if not os.path.exists('dist'):
        print("Error: 'dist' directory not found. Please run 'npm run build' first.")
    else:
        # Start the server in a separate thread
        server_thread = threading.Thread(target=run_server, daemon=True)
        server_thread.start()
        
        try:
            # Keep the main thread alive
            while True:
                pass
        except KeyboardInterrupt:
            print("\nShutting down server...")
