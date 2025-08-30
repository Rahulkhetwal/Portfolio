import os
import subprocess
import sys
import webbrowser
from pathlib import Path

def main():
    # Check if we're running in Streamlit Cloud
    is_streamlit_cloud = os.environ.get('STREAMLIT_SERVER_RUNNING_ON_CLOUD', '').lower() == 'true'
    
    if is_streamlit_cloud:
        print("Running in Streamlit Cloud environment")
        print("Starting FastAPI server...")
        
        # Install required packages
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        
        # Start FastAPI server
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
