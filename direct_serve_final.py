import os
import subprocess
import sys
import webbrowser
import shutil
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler

def serve_static_files():
    """Serve static files using Python's built-in HTTP server"""
    print("Starting static file server...")
    
    # Check if dist directory exists
    dist_dir = Path(__file__).parent / 'dist'
    if not dist_dir.exists():
        print("Error: dist directory not found!")
        return
    
    # Change to the dist directory
    os.chdir(dist_dir)
    
    # Start a simple HTTP server
    port = int(os.environ.get('PORT', 8501))
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f"Serving static files from {dist_dir} on port {port}...")
    httpd.serve_forever()

def main():
    # Check if we're running in Streamlit Cloud
    is_streamlit_cloud = os.environ.get('STREAMLIT_SERVER_RUNNING_ON_CLOUD', '').lower() == 'true'
    
    if is_streamlit_cloud:
        print("Running in Streamlit Cloud environment")
        
        # Install Node.js and npm
        print("Installing Node.js and npm...")
        try:
            # Install NodeSource Node.js 16.x
            subprocess.run("""
            curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
            apt-get install -y nodejs
            """, shell=True, check=True, executable="/bin/bash")
            
            # Verify installation
            subprocess.run(["node", "--version"], check=True)
            subprocess.run(["npm", "--version"], check=True)
            
        except subprocess.CalledProcessError as e:
            print(f"Error installing Node.js: {e}")
            print("Falling back to static file serving...")
            return serve_static_files()
        
        print("Installing Python dependencies...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        
        print("Installing npm dependencies...")
        subprocess.check_call(["npm", "install"])
        
        print("Building React app...")
        subprocess.check_call(["npm", "run", "build"])
        
        print("Starting FastAPI server...")
        import uvicorn
        uvicorn.run("fastapi_server:app", host="0.0.0.0", port=8501)
    else:
        # For local development
        print("Running in local development environment")
        print("Starting development server...")
        
        # Start Vite dev server
        subprocess.Popen(["npm", "run", "dev"], 
                        cwd=Path(__file__).parent,
                        shell=True)
        
        # Open browser
        webbrowser.open("http://localhost:3000")

if __name__ == "__main__":
    main()
