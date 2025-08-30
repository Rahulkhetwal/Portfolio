import os
import streamlit as st
from pathlib import Path
import subprocess

# Set page config
st.set_page_config(
    page_title="Rahul Khetwal - Portfolio",
    page_icon="👨‍💻",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit elements
hide_streamlit_style = """
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .stApp {
        padding: 0 !important;
        margin: 0 !important;
    }
    iframe {
        border: none;
        width: 100%;
        height: 100vh;
    }
    </style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

def build_react_app():
    """Build the React app if not already built"""
    dist_path = Path("dist")
    if not dist_path.exists() or not list(dist_path.glob("*")):
        st.info("Building React app... This may take a minute.")
        try:
            result = subprocess.run(["npm", "run", "build"], capture_output=True, text=True)
            if result.returncode != 0:
                st.error("Build failed. Please check the logs below:")
                st.code(result.stderr)
                return False
            return True
        except Exception as e:
            st.error(f"Error building React app: {str(e)}")
            return False
    return True

# Check if dist directory exists and has content
if build_react_app():
    # Create an absolute path to the index.html file
    index_path = Path("dist") / "index.html"
    
    if index_path.exists():
        # Read the HTML content
        with open(index_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Fix asset paths for Streamlit
        html_content = html_content.replace('src="/', 'src="./dist/')
        html_content = html_content.replace('href="/', 'href="./dist/')
        
        # Display the content
        st.components.v1.html(html_content, height=1000, scrolling=True)
    else:
        st.error("Error: index.html not found in the dist directory.")
        st.code("npm run build")
