# Quickstart Guide: Todo Full-Stack Application

## Development Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Neon Serverless PostgreSQL account
- Better Auth account (or local setup)

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Set up environment variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `AUTH_SECRET`: Secret for authentication tokens
6. Run database migrations: `python -m alembic upgrade head`
7. Start the backend: `uvicorn src.main:app --reload`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`:
   - `NEXT_PUBLIC_API_URL`: URL of the backend API
4. Start the development server: `npm run dev`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out

### Todo Management
- `GET /api/todos` - Get user's todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `PATCH /api/todos/{id}/complete` - Toggle todo completion
- `DELETE /api/todos/{id}` - Delete a todo

## Database Schema
The application uses two main tables:
- `users`: Stores user information (id, email, password hash, timestamps)
- `todos`: Stores todo items (id, content, completed status, user_id, timestamps)

## Authentication Flow
1. User registers with email and password
2. Credentials are verified and user is created
3. Authentication token is returned
4. Token is stored in frontend and sent with each request
5. Backend validates token for each protected endpoint
6. User can only access their own todos based on user_id

## Running Tests
- Backend tests: `pytest`
- Frontend tests: `npm run test`

## Local Development
The application supports hot reloading in development mode. Both backend and frontend can be run in development mode simultaneously for integrated development.