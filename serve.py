import os
import streamlit as st
import subprocess
import http.server
import socketserver
import threading
import time
from pathlib import Path
import mimetypes

# Add MIME types
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('image/jpeg', '.jpg,.jpeg')
mimetypes.add_type('image/png', '.png')
mimetypes.add_type('application/pdf', '.pdf')

# Configuration
PORT = 8000
HOST = '127.0.0.1'
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        # Cache static assets for 1 hour in production
        if os.getenv('ENVIRONMENT') == 'production':
            if self.path.endswith(('.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.gif')):
                self.send_header('Cache-Control', 'public, max-age=3600')
        super().end_headers()
    
    def guess_type(self, path):
        # Override MIME type detection
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith(('.png', '.jpg', '.jpeg', '.gif')):
            return f'image/{path.split(".")[-1]}'
        elif path.endswith('.svg'):
            return 'image/svg+xml'
        return super().guess_type(path)

def build_react_app():
    """Build the React app if needed."""
    if os.path.exists(DIST_DIR) and os.listdir(DIST_DIR):
        return True  # Already built
    
    try:
        # Create dist directory if it doesn't exist
        os.makedirs(DIST_DIR, exist_ok=True)
        
        # Install dependencies if needed
        if not os.path.exists('node_modules'):
            subprocess.run(['npm', 'install'], check=True, shell=True)
        
        # Build the React app
        subprocess.run(['npm', 'run', 'build'], check=True, shell=True)
        return True
    except subprocess.CalledProcessError as e:
        st.error(f"Failed to build React app: {e}")
        return False
    except Exception as e:
        st.error(f"Error building React app: {str(e)}")
        return False

def start_server():
    """Start the HTTP server."""
    os.chdir(DIST_DIR)
    with socketserver.TCPServer((HOST, PORT), CORSRequestHandler) as httpd:
        print(f"Serving at http://{HOST}:{PORT}")
        httpd.serve_forever()

def main():
    st.set_page_config(
        page_title="Rahul Khetwal - Portfolio",
        page_icon="👨‍💻",
        layout="wide",
        initial_sidebar_state="collapsed"
    )

    # Hide Streamlit elements and style the iframe
    st.markdown("""
        <style>
        #MainMenu, footer, header { visibility: hidden; }
        .stApp { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
        iframe { border: none; width: 100% !important; height: 100vh !important; }
        </style>
    """, unsafe_allow_html=True)

    # Build React app if needed
    if not build_react_app():
        st.error("Failed to build the application. Please check the logs.")
        return

    # Start the server in a separate thread
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # Give the server a moment to start
    time.sleep(1)

    # Embed the React app in an iframe
    st.components.v1.iframe(
        f"http://{HOST}:{PORT}/",
        height=1000,
        scrolling=True
    )

if __name__ == "__main__":
    main()
