#!/bin/bash
# Backend startup script for Todo API

echo "Starting Todo API backend..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please update .env with your database configuration before running the app."
    exit 1
fi

# Install dependencies if not already installed
echo "Installing dependencies..."
pip install -r requirements.txt

# Run the FastAPI application
echo "Starting the application..."
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000