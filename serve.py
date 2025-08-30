import os
import streamlit as st
import subprocess
import http.server
import socketserver
import threading
import time
import sys
from pathlib import Path
import mimetypes
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add MIME types
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('image/jpeg', '.jpg,.jpeg')
mimetypes.add_type('image/png', '.png')
mimetypes.add_type('application/pdf', '.pdf')

# Configuration
PORT = int(os.environ.get('PORT', 8000))
HOST = '0.0.0.0'  # Listen on all interfaces
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, 'dist')

# Ensure the dist directory exists
os.makedirs(DIST_DIR, exist_ok=True)

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
    try:
        # Check if we're on Streamlit Cloud
        is_streamlit_cloud = os.environ.get('STREAMLIT_SERVER_RUNNING_ON_CLOUD', 'false').lower() == 'true'
        
        # Only build if not on Streamlit Cloud or if dist is empty
        if not is_streamlit_cloud or not os.path.exists(DIST_DIR) or not os.listdir(DIST_DIR):
            logger.info("Building React app...")
            
            # Install dependencies if needed
            if not os.path.exists('node_modules'):
                logger.info("Installing npm dependencies...")
                subprocess.run(['npm', 'install'], check=True, shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
            
            # Build the React app
            logger.info("Running npm build...")
            subprocess.run(['npm', 'run', 'build'], check=True, shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
            logger.info("React app built successfully")
        else:
            logger.info("Using pre-built React app")
            
        return True
        
    except subprocess.CalledProcessError as e:
        error_msg = f"Failed to build React app: {e.stderr.decode() if hasattr(e, 'stderr') else str(e)}"
        logger.error(error_msg)
        st.error(error_msg)
        return False
    except Exception as e:
        error_msg = f"Error building React app: {str(e)}"
        logger.error(error_msg)
        st.error(error_msg)
        return False

def start_server():
    """Start the HTTP server."""
    os.chdir(DIST_DIR)
    
    class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
        daemon_threads = True
    
    try:
        with ThreadedHTTPServer((HOST, PORT), CORSRequestHandler) as httpd:
            logger.info(f"Serving static files from {DIST_DIR} at http://{HOST}:{PORT}")
            httpd.serve_forever()
    except OSError as e:
        logger.error(f"Failed to start HTTP server: {str(e)}")
        st.error(f"Failed to start HTTP server: {str(e)}")
        sys.exit(1)

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
        .stApp { 
            padding: 0 !important; 
            margin: 0 !important; 
            max-width: 100% !important; 
            min-height: 100vh !important;
        }
        iframe { 
            border: none; 
            width: 100% !important; 
            height: 100vh !important; 
            min-height: 100vh !important;
        }
        </style>
    """, unsafe_allow_html=True)

    # Display a loading message
    with st.spinner('Loading portfolio...'):
        # Build React app if needed
        if not build_react_app():
            st.error("Failed to build the application. Please check the logs.")
            return

        # Start the server in a separate thread
        server_thread = threading.Thread(target=start_server, daemon=True)
        server_thread.start()
        
        # Give the server a moment to start
        time.sleep(2)

        # Get the correct URL for the iframe
        if os.environ.get('STREAMLIT_SERVER_RUNNING_ON_CLOUD', 'false').lower() == 'true':
            # On Streamlit Cloud, we need to use a different URL
            iframe_url = f"https://{os.environ['STREAMLIT_SERVER_BASE_URL']}/"
        else:
            iframe_url = f"http://{HOST}:{PORT}/"

        # Embed the React app in an iframe
        st.components.v1.iframe(
            iframe_url,
            height=1000,
            scrolling=True
        )

if __name__ == "__main__":
    main()
