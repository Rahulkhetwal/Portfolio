#!/bin/bash
set -e  # Exit on any error

# Print environment for debugging
echo "=== Environment Variables ==="
printenv | sort
echo "==========================="

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p ~/.streamlit

# Create config.toml
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

# Print current directory and files for debugging
echo "=== Current Directory ==="
pwd
ls -la
echo "======================="

# Install Node.js and npm using nvm (Node Version Manager)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load nvm

if ! command -v nvm &> /dev/null; then
    echo "Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
fi

# Install Node.js LTS
echo "Installing Node.js..."
nvm install --lts
nvm use --lts

# Verify installations
echo "=== Node.js Environment ==="
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo "=========================="

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Build the React app
echo "Building React app..."
VITE_BASE_URL=/ npm run build

# Verify build output
echo "=== Build Output ==="
ls -la dist/
echo "===================="

# Install Python dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Print final directory structure
echo "=== Final Directory Structure ==="
find . -maxdepth 3 -type d | sort
echo "================================"

echo "✅ Deployment setup completed successfully!"
