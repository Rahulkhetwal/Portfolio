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

    # Hide Streamlit elements
    st.markdown("""
    <style>
    #MainMenu, footer, header, .stDeployButton { 
        display: none !important;
    }
    .stApp { 
        padding: 0 !important; 
        margin: 0 !important; 
        width: 100% !important;
        max-width: 100% !important;
    }
    iframe {
        position: fixed;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        border: none;
    }
    </style>
    """, unsafe_allow_html=True)

    # Get the base URL
    is_streamlit_cloud = os.environ.get('STREAMLIT_SERVER_RUNNING_ON_CLOUD', '').lower() == 'true'
    base_url = os.environ.get('STREAMLIT_SERVER_BASE_URL', '')
    
    # Try to find and serve the built React app
    try:
        # Look for dist directory in multiple possible locations
        possible_dirs = [
            Path(__file__).parent / 'dist',
            Path('/mount/src/portfolio/dist'),
            Path('/app/portfolio/dist'),
            Path('/app/dist')
        ]
        
        dist_dir = None
        for dir_path in possible_dirs:
            if dir_path.exists() and (dir_path / 'index.html').exists():
                dist_dir = dir_path
                break
        
        if not dist_dir:
            st.error("Error: Could not find built React app. Please build the app first.")
            st.code("""
            # To build the React app, run:
            npm install
            npm run build
            """)
            return
        
        # Read the index.html file
        index_path = dist_dir / 'index.html'
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fix asset paths for Streamlit Cloud
        if is_streamlit_cloud and base_url:
            # Get the app URL without the protocol
            base_path = f"https://{base_url}"
            
            # Update asset paths
            content = content.replace('href="/', f'href="{base_path}/')
            content = content.replace('src="/', f'src="{base_path}/')
            
            # Add base URL
            content = content.replace(
                '<head>', 
                f'<head><base href="{base_path}/" />'
            )
        
        # Force HTTPS for all resources
        content = content.replace('http://', 'https://')
        
        # Add CSP meta tag
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
        content = content.replace('<head>', f'<head>{csp_meta}')
        
        # Display the content
        st.components.v1.html(
            content,
            height=1000,
            scrolling=True
        )
        
    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
        st.error(f"Current working directory: {os.getcwd()}")
        st.error(f"Files in directory: {os.listdir('.')}")
        if 'dist_dir' in locals() and dist_dir:
            st.error(f"Files in dist: {os.listdir(dist_dir)}")

if __name__ == "__main__":
    main()
