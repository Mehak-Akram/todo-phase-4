@echo off
REM Backend startup script for Todo API

echo Starting Todo API backend...

REM Check if .env file exists
if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo Please update .env with your database configuration before running the app.
    echo For PostgreSQL, you can install it locally or use Docker:
    echo docker run --name postgres-todo -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -e POSTGRES_DB=todo_app -p 5432:5432 -d postgres:13
    pause
    exit /b 1
)

REM Install dependencies if not already installed
echo Installing dependencies...
pip install -r requirements.txt

REM Run the FastAPI application
echo Starting the application...
uvicorn src.main:app --reload --host 127.0.0.1 --port 8000

pause