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
    base_url = ""
    if os.environ.get('STREAMLIT_SERVER_BASE_URL'):
        base_url = f"https://{os.environ.get('STREAMLIT_SERVER_BASE_URL')}"
    
    # Try to find and serve the built React app
    try:
        dist_dir = Path(__file__).parent / 'dist'
        index_path = dist_dir / 'index.html'
        
        if index_path.exists():
            with open(index_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix asset paths
            if base_url:
                content = content.replace('href="/', f'href="{base_url}/')
                content = content.replace('src="/', f'src="{base_url}/')
            
            # Force HTTPS
            content = content.replace('http://', 'https://')
            
            # Add base URL
            if base_url:
                content = content.replace('<head>', f'<head><base href="{base_url}/" />')
            
            # Display the content
            st.components.v1.html(content, height=1000, scrolling=True)
        else:
            st.error("Built React app not found. Please build the app first.")
            st.code("""
            # To build the React app, run:
            npm install
            npm run build
            """)
            
    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
        st.error("Please check the deployment logs for more details.")

if __name__ == "__main__":
    main()
