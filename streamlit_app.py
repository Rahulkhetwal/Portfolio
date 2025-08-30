import os
import streamlit as st
from streamlit.web.server.websocket_headers import _get_websocket_headers

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
    </style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# Read and serve your built React files
def read_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

# Serve the main HTML file
try:
    # Path to your built React files
    index_html = read_file('dist/index.html')
    
    # Inject base URL for relative paths
    base_url = os.environ.get('STREAMLIT_SERVER_BASE_URL_PATH', '')
    if base_url:
        index_html = index_html.replace('<head>', f'<head><base href="{base_url}/">')
    
    # Display the content
    st.components.v1.html(index_html, height=1000, scrolling=True)
    
except Exception as e:
    st.error(f"Error loading portfolio: {str(e)}")
    st.info("Please make sure you've built your React app with 'npm run build'")
    st.code("npm run build")
