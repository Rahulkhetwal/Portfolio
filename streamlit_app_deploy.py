import os
import streamlit as st
from pathlib import Path

def main():
    st.set_page_config(
        page_title="Rahul Khetwal - Portfolio",
        page_icon="👨‍💻",
        layout="wide",
        initial_sidebar_state="collapsed"
    )

    # Hide Streamlit elements and enhance styling
    st.markdown("""
    <style>
    /* Hide Streamlit UI elements */
    #MainMenu, footer, header, .stDeployButton { 
        visibility: hidden !important; 
    }
    
    /* Main app container */
    .stApp { 
        padding: 0 !important; 
        margin: 0 !important; 
        max-width: 100% !important; 
        min-height: 100vh !important;
        overflow: hidden !important;
        background-color: #0f172a !important;  /* Match your theme */
    }
    
    /* Ensure full viewport height */
    html, body, #root, #root > div {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden !important;
    }
    
    /* Fix for iframe content */
    iframe {
        border: none !important;
        width: 100% !important;
        height: 100vh !important;
        min-height: 100vh !important;
        position: fixed;
        top: 0;
        left: 0;
    }
    </style>
    """, unsafe_allow_html=True)

    # Get the absolute path to the dist directory
    base_dir = Path(__file__).parent
    dist_dir = base_dir / 'dist'
    
    try:
        # Check if we're on Streamlit Cloud
        is_streamlit_cloud = os.environ.get('STREAMLIT_SERVER_RUNNING_ON_CLOUD', 'false').lower() == 'true'
        
        # Get the base URL
        base_url = f"https://{os.environ.get('STREAMLIT_SERVER_BASE_URL', '')}"
        
        # Read the built index.html
        index_path = dist_dir / 'index.html'
        if not index_path.exists():
            st.error(f"Error: index.html not found at {index_path}")
            st.error(f"Current directory: {os.getcwd()}")
            st.error(f"Files in directory: {os.listdir('.')}")
            if dist_dir.exists():
                st.error(f"Files in dist: {os.listdir(dist_dir)}")
            return
        
        with open(index_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Fix asset paths
        html_content = html_content.replace('href="/', f'href="{base_url}/')
        html_content = html_content.replace('src="/', f'src="{base_url}/')
        
        # Force HTTPS for all resources
        html_content = html_content.replace('http://', 'https://')
        
        # Add base URL for relative paths
        html_content = html_content.replace(
            '<head>', 
            f'<head><base href="{base_url}/" />'
        )
        
        # Add CSP meta tag for security
        csp_meta = '''
        <meta http-equiv="Content-Security-Policy" 
            content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';
            img-src 'self' https: data:;
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
            style-src 'self' 'unsafe-inline' https:;
            font-src 'self' https: data:;
            connect-src 'self' https: wss:;
            frame-ancestors 'self' https://*.streamlit.app;">
        '''
        html_content = html_content.replace('<head>', f'<head>{csp_meta}')
        
        # Display the content
        st.components.v1.html(
            html_content,
            height=1000,
            scrolling=True
        )
        
    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
        st.error(f"Current working directory: {os.getcwd()}")
        st.error(f"Files in directory: {os.listdir('.')}")
        if dist_dir.exists():
            st.error(f"Files in dist: {os.listdir(dist_dir)}")

if __name__ == "__main__":
    main()
