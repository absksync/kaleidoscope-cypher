#!/bin/bash

# Setup script for Kaleidoscope Cypher backend

echo "Setting up Kaleidoscope Cypher Backend..."

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "Installing dependencies..."
pip install Flask flask-cors flask-socketio python-socketio python-engineio numpy

# Optional: Install ML dependencies
read -p "Do you want to install ML dependencies for advanced diversity analysis? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Installing ML dependencies..."
    pip install sentence-transformers scikit-learn
fi

# Optional: Install OpenAI
read -p "Do you want to install OpenAI for AI-generated prompts? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Installing OpenAI..."
    pip install openai
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "Please edit .env and add your OPENAI_API_KEY if you have one"
fi

echo "Backend setup complete!"
echo "To start the server, run: python app.py"
