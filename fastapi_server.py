from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
import os
from pathlib import Path

app = FastAPI()

# Get the absolute path to the dist directory
BASE_DIR = Path(__file__).parent
dist_dir = BASE_DIR / 'dist'

# Mount static files
app.mount(
    "/assets",
    StaticFiles(directory=str(dist_dir / "assets")),
    name="assets"
)

# Serve images
app.mount(
    "/images",
    StaticFiles(directory=str(dist_dir / "images")),
    name="images"
)

# Serve the main HTML file
@app.get("/", response_class=HTMLResponse)
async def read_root():
    index_path = dist_dir / "index.html"
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add CSP meta tag
    csp_meta = '''
    <meta http-equiv="Content-Security-Policy" 
        content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:;
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
        style-src 'self' 'unsafe-inline' https:;
        img-src 'self' data: https:;
        font-src 'self' data: https:;
        connect-src 'self' https: wss:;
        frame-src 'self' https:;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'self' https://*.streamlit.app;
        upgrade-insecure-requests;">
    '''
    
    # Insert CSP meta tag after the opening head tag
    content = content.replace('<head>', '<head>' + csp_meta)
    
    return content

# Serve other static files
@app.get("/{file_path:path}")
async def serve_file(file_path: str):
    file_path = dist_dir / file_path
    if file_path.exists() and file_path.is_file():
        return FileResponse(file_path)
    return {"error": "File not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8501)
