# Todo Full-Stack Application

A full-stack web application for managing todos with user authentication.

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

## Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL database URL
- `SECRET_KEY` - Secret key for JWT tokens
- `DEBUG` - Enable/disable debug mode

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Base URL for the backend API

## Project Structure

```
backend/
├── src/
│   ├── models/      # Data models
│   ├── services/    # Business logic
│   ├── api/         # API routes
│   ├── database/    # Database configuration
│   └── middleware/  # Middleware
└── tests/           # Test files

frontend/
├── src/
│   ├── components/  # React components
│   ├── pages/       # Next.js pages
│   ├── services/    # API services
│   └── types/       # TypeScript types
└── tests/           # Test files
```

## Testing

Backend tests:
```bash
cd backend
pytest
```

Frontend tests:
```bash
cd frontend
npm test
```

## Deployment

The application is designed to be deployed with:
- Backend: Any Python WSGI/ASGI hosting service
- Frontend: Any static hosting service (Vercel, Netlify, etc.)
- Database: Neon Serverless PostgreSQL