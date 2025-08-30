#!/bin/bash

# Create necessary directories
mkdir -p ~/.streamlit/

# Create config.toml
echo "\
[server]\n\
headless = true\n\
port = 8501\n\
enableCORS = false\n\
\n\n[browser]\n\nserverAddress = \"\"\n\n\n\n[theme]\n\nbase = \"dark\"\n\nprimaryColor = \"#1f77b4\"\n\nbackgroundColor = \"#0e1117\"\n\nsecondaryBackgroundColor = \"#1e1e1e\"\n\ntextColor = \"#fafafa\"\n\nfont = \"sans serif\"\n" > ~/.streamlit/config.toml

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install npm dependencies
npm install

# Build the React app
npm run build

# Install Python dependencies
pip install -r requirements.txt
