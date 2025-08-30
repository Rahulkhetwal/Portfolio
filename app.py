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
    hide_streamlit_style = """
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
    """
    st.markdown(hide_streamlit_style, unsafe_allow_html=True)

    # Get the absolute path to the dist directory
    base_dir = Path(__file__).parent
    dist_dir = base_dir / 'dist'
    
    # Check if we're on Streamlit Cloud
    is_streamlit_cloud = os.environ.get('STREAMLIT_SERVER_RUNNING_ON_CLOUD', 'false').lower() == 'true'
    
    if is_streamlit_cloud:
        # On Streamlit Cloud, serve the content directly
        try:
            index_path = dist_dir / 'index.html'
            if not index_path.exists():
                st.error(f"index.html not found at: {index_path}")
                st.error(f"Files in dist: {os.listdir(dist_dir) if dist_dir.exists() else 'dist directory not found'}")
                return
                
            with open(index_path, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            # Fix asset paths
            base_url = f"https://{os.environ.get('STREAMLIT_SERVER_BASE_URL', '')}"
            html_content = html_content.replace('href="/', f'href="{base_url}/')
            html_content = html_content.replace('src="/', f'src="{base_url}/')
            
            # Force HTTPS for all resources
            html_content = html_content.replace('http://', 'https://')
            
            # Add base URL for relative paths
            html_content = html_content.replace(
                '<head>', 
                f'<head><base href="{base_url}/" />'
            )
            
            # Display the content
            st.components.v1.html(
                html_content,
                height=1000,
                scrolling=True
            )
            
        except Exception as e:
            st.error(f"Failed to load portfolio: {str(e)}")
            st.error(f"Current working directory: {os.getcwd()}")
            st.error(f"Files in directory: {os.listdir('.')}")
    else:
        # Local development
        st.warning("This app is designed to run on Streamlit Cloud.")
        st.info("To run locally, use: npm run dev")

if __name__ == "__main__":
    main()
