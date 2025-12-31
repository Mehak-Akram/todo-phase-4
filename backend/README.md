# Todo API Backend

This is the backend for the Todo application built with FastAPI.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your database configuration.

## Database Setup

The application uses PostgreSQL. You can either:

- Install PostgreSQL locally and update the `DATABASE_URL` in your `.env` file
- Use Docker to run PostgreSQL:
  ```bash
  docker run --name postgres-todo -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -e POSTGRES_DB=todo_app -p 5432:5432 -d postgres:13
  ```

## Running the Application

To run the backend in development mode:

```bash
uvicorn src.main:app --reload
```

Or use the provided startup script:

On Windows:
```bash
start.bat
```

On Linux/Mac:
```bash
./start.sh
```

The API will be available at `http://127.0.0.1:8000`

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET/POST/PUT/DELETE /api/todos` - Todo management endpoints

## Project Structure

- `src/main.py` - Main FastAPI application
- `src/api/` - API route definitions
- `src/models/` - Database models
- `src/services/` - Business logic
- `src/database/` - Database configuration
- `src/utils/` - Utility functions