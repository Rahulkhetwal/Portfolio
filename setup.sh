#!/bin/bash
set -e  # Exit on any error

# Create necessary directories
mkdir -p ~/.streamlit/

# Create config.toml
cat > ~/.streamlit/config.toml <<EOL
[server]
headless = true
port = 8501
enableCORS = false

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
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la

# Install Node.js and npm using nvm (Node Version Manager)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load nvm

if ! command -v nvm &> /dev/null; then
    echo "Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
fi

# Install Node.js LTS
echo "Installing Node.js..."
nvm install --lts
nvm use --lts

# Verify installations
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Create dist directory if it doesn't exist
mkdir -p dist

# Build the React app
echo "Building React app..."
npm run build

# Verify build output
echo "Build output in dist directory:"
ls -la dist/

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Setup completed successfully!"
echo "Current directory structure:"
find . -maxdepth 3 -type d | sort
