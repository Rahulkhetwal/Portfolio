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
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        
        # Cache static assets for 1 hour in production
        if os.getenv('ENVIRONMENT') == 'production' or os.environ.get('STREAMLIT_SERVER_RUNNING_ON_CLOUD', 'false').lower() == 'true':
            if self.path.endswith(('.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.gif')):
                self.send_header('Cache-Control', 'public, max-age=3600')
        super().end_headers()
        
    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200, "ok")
        self.end_headers()
    
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
        # On Streamlit Cloud, the build is handled by setup.sh
        if os.environ.get('STREAMLIT_SERVER_RUNNING_ON_CLOUD', 'false').lower() == 'true':
            logger.info("Running on Streamlit Cloud - using pre-built React app")
            if not os.path.exists(DIST_DIR) or not os.listdir(DIST_DIR):
                error_msg = "React app not built. Please check the build logs in setup.sh"
                logger.error(error_msg)
                st.error(error_msg)
                return False
            return True
            
        # Local development: Build if dist is empty or doesn't exist
        if not os.path.exists(DIST_DIR) or not os.listdir(DIST_DIR):
            logger.info("Building React app locally...")
            
            # Install dependencies if needed
            if not os.path.exists('node_modules'):
                logger.info("Installing npm dependencies...")
                result = subprocess.run(
                    'npm install', 
                    shell=True, 
                    capture_output=True, 
                    text=True
                )
                if result.returncode != 0:
                    logger.error(f"npm install failed: {result.stderr}")
                    return False
            
            # Build the React app
            logger.info("Running npm build...")
            result = subprocess.run(
                'npm run build', 
                shell=True, 
                capture_output=True, 
                text=True
            )
            if result.returncode != 0:
                logger.error(f"Build failed: {result.stderr}")
                return False
                
            logger.info("React app built successfully")
        else:
            logger.info("Using existing React build")
            
        return True
        
    except Exception as e:
        error_msg = f"Error in build_react_app: {str(e)}"
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

    # Check if we're on Streamlit Cloud
    is_streamlit_cloud = os.environ.get('STREAMLIT_SERVER_RUNNING_ON_CLOUD', 'false').lower() == 'true'
    
    # Display a loading message
    with st.spinner('Loading portfolio...'):
        # Build React app if needed
        if not build_react_app():
            st.error("Failed to build the application. Please check the logs.")
            return

        if is_streamlit_cloud:
            # On Streamlit Cloud, serve the index.html directly
            try:
                # Read the index.html file
                with open(os.path.join(DIST_DIR, 'index.html'), 'r', encoding='utf-8') as f:
                    html_content = f.read()
                
                # Replace all asset paths to be relative
                base_url = f"https://{os.environ['STREAMLIT_SERVER_BASE_URL']}"
                html_content = html_content.replace('href="/', f'href="{base_url}/')
                html_content = html_content.replace('src="/', f'src="{base_url}/')
                
                # Force HTTPS for all external resources
                html_content = html_content.replace('http://', 'https://')
                
                # Add base URL for relative paths
                html_content = html_content.replace(
                    '<head>', 
                    f'<head><base href="{base_url}/" />'
                )
                
                # Inject a script to handle any dynamic asset loading
                html_content = html_content.replace(
                    '</body>',
                    '''<script>
                    // Fix for any dynamically loaded assets
                    document.addEventListener('DOMContentLoaded', function() {
                        // Force HTTPS for any dynamically created elements
                        const observer = new MutationObserver(function(mutations) {
                            document.querySelectorAll('img, script, link[rel="stylesheet"]').forEach(el => {
                                if (el.src && el.src.startsWith('http://')) {
                                    el.src = el.src.replace('http://', 'https://');
                                }
                                if (el.href && el.href.startsWith('http://')) {
                                    el.href = el.href.replace('http://', 'https://');
                                }
                            });
                        });
                        observer.observe(document.documentElement, {
                            childList: true,
                            subtree: true
                        });
                    });
                    </script></body>'''
                )
                
                st.components.v1.html(html_content, height=1000, scrolling=True)
                
            except Exception as e:
                st.error(f"Failed to load portfolio: {str(e)}")
                st.error(f"Current working directory: {os.getcwd()}")
                st.error(f"Files in dist: {os.listdir(DIST_DIR) if os.path.exists(DIST_DIR) else 'dist directory not found'}")
        else:
            # Local development: Use the HTTP server
            server_thread = threading.Thread(target=start_server, daemon=True)
            server_thread.start()
            time.sleep(2)  # Give the server a moment to start
            st.components.v1.iframe(
                f"http://{HOST}:{PORT}/",
                height=1000,
                scrolling=True
            )

if __name__ == "__main__":
    main()
