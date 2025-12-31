# API Contracts: Todo Full-Stack Application

## Authentication Endpoints

### POST /api/auth/signup
**Purpose**: Create a new user account
**Request**:
- Content-Type: application/json
- Body: { "email": "string", "password": "string" }
**Response**:
- 201 Created: { "user": { "id": "uuid", "email": "string" }, "token": "string" }
- 400 Bad Request: { "error": "string" }
- 409 Conflict: { "error": "Email already exists" }

### POST /api/auth/signin
**Purpose**: Authenticate existing user
**Request**:
- Content-Type: application/json
- Body: { "email": "string", "password": "string" }
**Response**:
- 200 OK: { "user": { "id": "uuid", "email": "string" }, "token": "string" }
- 400 Bad Request: { "error": "string" }
- 401 Unauthorized: { "error": "Invalid credentials" }

### POST /api/auth/signout
**Purpose**: Sign out current user
**Request**:
- Headers: { "Authorization": "Bearer {token}" }
**Response**:
- 200 OK: { "message": "Signed out successfully" }
- 401 Unauthorized: { "error": "Not authenticated" }

## Todo Endpoints

### GET /api/todos
**Purpose**: Retrieve all todos for the authenticated user
**Request**:
- Headers: { "Authorization": "Bearer {token}" }
**Response**:
- 200 OK: { "todos": [ { "id": "uuid", "content": "string", "completed": "boolean", "created_at": "datetime", "updated_at": "datetime" } ] }
- 401 Unauthorized: { "error": "Not authenticated" }

### POST /api/todos
**Purpose**: Create a new todo for the authenticated user
**Request**:
- Headers: { "Authorization": "Bearer {token}" }
- Content-Type: application/json
- Body: { "content": "string" }
**Response**:
- 201 Created: { "id": "uuid", "content": "string", "completed": "boolean", "created_at": "datetime", "updated_at": "datetime" }
- 400 Bad Request: { "error": "string" }
- 401 Unauthorized: { "error": "Not authenticated" }

### PUT /api/todos/{id}
**Purpose**: Update an existing todo for the authenticated user
**Request**:
- Headers: { "Authorization": "Bearer {token}" }
- Content-Type: application/json
- Body: { "content": "string" }
**Response**:
- 200 OK: { "id": "uuid", "content": "string", "completed": "boolean", "created_at": "datetime", "updated_at": "datetime" }
- 400 Bad Request: { "error": "string" }
- 401 Unauthorized: { "error": "Not authenticated" }
- 404 Not Found: { "error": "Todo not found" }

### PATCH /api/todos/{id}/complete
**Purpose**: Toggle completion status of a todo for the authenticated user
**Request**:
- Headers: { "Authorization": "Bearer {token}" }
- Content-Type: application/json
- Body: { "completed": "boolean" }
**Response**:
- 200 OK: { "id": "uuid", "content": "string", "completed": "boolean", "created_at": "datetime", "updated_at": "datetime" }
- 400 Bad Request: { "error": "string" }
- 401 Unauthorized: { "error": "Not authenticated" }
- 404 Not Found: { "error": "Todo not found" }

### DELETE /api/todos/{id}
**Purpose**: Delete a specific todo for the authenticated user
**Request**:
- Headers: { "Authorization": "Bearer {token}" }
**Response**:
- 200 OK: { "message": "Todo deleted successfully" }
- 401 Unauthorized: { "error": "Not authenticated" }
- 404 Not Found: { "error": "Todo not found" }