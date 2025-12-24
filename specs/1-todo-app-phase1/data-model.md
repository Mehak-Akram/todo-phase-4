# Data Model: Phase I - Evolution of Todo

## Task Entity

### Attributes
- **id**: Integer, auto-generated, unique identifier for each task
  - Required: Yes
  - Constraints: Positive integer, auto-incrementing, unique across all tasks
- **description**: String, text content of the task
  - Required: Yes
  - Constraints: Non-empty string, maximum 1000 characters
- **status**: Boolean, completion status of the task
  - Required: Yes
  - Default: False (incomplete)
  - Values: True (complete) or False (incomplete)
- **created_at**: String, timestamp when task was added
  - Required: Yes
  - Format: ISO 8601 format (YYYY-MM-DD HH:MM:SS)
  - Auto-generated: Yes

### Validation Rules
- Task description must not be empty or contain only whitespace
- Task ID must be unique within the application session
- Task status must be a boolean value
- Task ID must be a positive integer

### State Transitions
- New task: status = False (incomplete)
- Mark complete: status = True
- Mark incomplete: status = False

### Relationships
- The Task entity exists independently (no relationships with other entities in Phase I)

### In-Memory Storage Structure
Tasks will be stored in a Python list where each element is a dictionary containing the task attributes:
```python
tasks = [
    {
        "id": 1,
        "description": "Sample task description",
        "status": False,
        "created_at": "2025-12-24 10:30:00"
    },
    {
        "id": 2,
        "description": "Another task",
        "status": True,
        "created_at": "2025-12-24 10:31:00"
    }
]
```

### ID Generation Strategy
- Maintain a global counter variable that starts at 1
- Increment the counter for each new task
- Assign the current counter value as the task ID
- This ensures unique, sequential IDs within the application session