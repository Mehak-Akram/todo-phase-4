# Data Model: Todo Full-Stack Application

## User Entity

**Entity Name**: User
**Fields**:
- id: UUID (Primary Key, auto-generated)
- email: String (Required, unique, valid email format)
- password_hash: String (Required, hashed password)
- created_at: DateTime (Auto-generated timestamp)
- updated_at: DateTime (Auto-generated timestamp)

**Relationships**:
- One-to-Many: User has many Todos (user.todos)

**Validation Rules**:
- Email must be a valid email format
- Email must be unique across all users
- Password must meet minimum security requirements (8+ characters)

## Todo Entity

**Entity Name**: Todo
**Fields**:
- id: UUID (Primary Key, auto-generated)
- content: String (Required, max 500 characters)
- completed: Boolean (Default: false)
- user_id: UUID (Foreign Key to User)
- created_at: DateTime (Auto-generated timestamp)
- updated_at: DateTime (Auto-generated timestamp)

**Relationships**:
- Many-to-One: Todo belongs to one User (todo.user)

**Validation Rules**:
- Content must not be empty
- Content must be less than 500 characters
- user_id must reference an existing User
- Only the owner user can modify the todo

## Database Schema

```
users table:
- id (UUID, PRIMARY KEY)
- email (VARCHAR, UNIQUE, NOT NULL)
- password_hash (VARCHAR, NOT NULL)
- created_at (TIMESTAMP, NOT NULL)
- updated_at (TIMESTAMP, NOT NULL)

todos table:
- id (UUID, PRIMARY KEY)
- content (VARCHAR, NOT NULL)
- completed (BOOLEAN, DEFAULT false)
- user_id (UUID, FOREIGN KEY -> users.id, NOT NULL)
- created_at (TIMESTAMP, NOT NULL)
- updated_at (TIMESTAMP, NOT NULL)
```

## State Transitions

**Todo State Transitions**:
- Incomplete → Complete: When user marks todo as complete
- Complete → Incomplete: When user marks todo as incomplete

**User Authentication States**:
- Unauthenticated → Authenticated: After successful sign-in
- Authenticated → Unauthenticated: After sign-out or session expiry