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

# Verify installations
echo "=== Versions ==="
echo "Node.js: $(node -v)"
echo "npm: $(npm -v)"
echo "Python: $(python3 --version)"
echo "================"

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Build the React app
echo "Building React app..."
VITE_BASE_URL=/ npm run build

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
