#!/bin/bash
set -e  # Exit on any error

# Print environment for debugging
echo "=== Environment Variables ==="
printenv | sort
echo "==========================="

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p ~/.streamlit

# Create minimal config
echo "Creating Streamlit config..."
cat > ~/.streamlit/config.toml <<EOL
[server]
headless = true
port = 8501
enableCORS = false
enableXsrfProtection = false

[browser]
serverAddress = ""

[theme]
base = "dark"
primaryColor = "#1f77b4"
backgroundColor = "#0e1117"
secondaryBackgroundColor = "#1e1e1e"
textColor = "#fafafa"
font = "sans serif"
EOL

# Print current directory
echo "=== Current Directory ==="
pwd
ls -la
echo "======================="

# Install Node.js if not already installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Build the React app with production settings
echo "Building React app..."
VITE_BASE_URL=/ npm run build -- --mode production

# Verify build output
echo "=== Build Output ==="
ls -la dist/
echo "==================="

# Install Python dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Print final directory structure
echo "=== Final Directory Structure ==="
find . -maxdepth 3 -type d | sort
echo "================================"

echo "✅ Deployment setup completed successfully!"
