# Todo Full-Stack Application

A full-stack web application for managing todos with user authentication, built with Python FastAPI backend and Next.js frontend.

## Features

- User registration and authentication
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- User-specific data isolation
- Responsive UI for desktop and mobile

## Tech Stack

### Backend
- Python 3.11
- FastAPI
- SQLModel
- PostgreSQL (Neon Serverless)
- Better Auth
- JWT for authentication

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios for API calls

## Project Structure

```
backend/                 # Python FastAPI backend
├── src/                 # Source code
│   ├── models/          # Data models (User, Todo)
│   ├── services/        # Business logic
│   ├── api/             # API routes
│   ├── database/        # Database configuration
│   └── middleware/      # Authentication middleware
└── tests/               # Test files

frontend/                # Next.js frontend
├── src/
│   ├── components/      # React components
│   ├── pages/           # Next.js pages
│   ├── services/        # API services
│   └── types/           # TypeScript types
└── tests/               # Test files

specs/                   # Specification files
└── 1-todo-fullstack/    # Phase II specifications
    ├── spec.md          # Feature specification
    ├── plan.md          # Implementation plan
    ├── data-model.md    # Data model
    ├── contracts/       # API contracts
    └── tasks.md         # Implementation tasks
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and secret key
   ```

4. Run the application:
   ```bash
   uvicorn src.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/signin` - Authenticate existing user
- `POST /api/auth/signout` - Sign out current user

### Todos
- `GET /api/todos` - Retrieve all todos for the authenticated user
- `POST /api/todos` - Create a new todo for the authenticated user
- `PUT /api/todos/{id}` - Update an existing todo for the authenticated user
- `DELETE /api/todos/{id}` - Delete a specific todo for the authenticated user
- `PATCH /api/todos/{id}/complete` - Toggle completion status of a todo for the authenticated user

## Development

### Running Tests

Backend tests:
```bash
cd backend
pytest
```

### Code Style

- Python: Follow PEP 8 guidelines
- TypeScript: Follow standard TypeScript/React best practices

## Deployment

The application is designed to be deployed with:
- Backend: Any Python WSGI/ASGI hosting service
- Frontend: Any static hosting service (Vercel, Netlify, etc.)
- Database: Neon Serverless PostgreSQL

## Architecture

- Clean architecture with clear separation of concerns
- Stateless API services
- JWT-based authentication
- User data isolation through foreign key relationships
- Responsive frontend with Next.js

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- User data isolation enforced at the application level
- Input validation on both frontend and backend