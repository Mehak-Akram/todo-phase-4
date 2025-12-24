# API Contracts: Phase I - Evolution of Todo

## CLI Interface Contracts

### Add Task Operation
- **Command**: User selects option 1 or "Add Task"
- **Input**: Task description string (non-empty)
- **Output**: Success message with assigned task ID
- **Error Cases**: Empty description returns error message
- **Validation**: Description must be non-empty and not contain only whitespace

### View Tasks Operation
- **Command**: User selects option 2 or "View Tasks"
- **Input**: None required
- **Output**: Formatted table of all tasks showing ID, status, and description
- **Error Cases**: Empty task list returns appropriate message
- **Validation**: None required

### Update Task Operation
- **Command**: User selects option 3 or "Update Task"
- **Input**: Task ID (integer) and new description string
- **Output**: Success message confirming update
- **Error Cases**: Invalid ID or empty description returns error message
- **Validation**: Task ID must exist in current list, description must be non-empty

### Delete Task Operation
- **Command**: User selects option 4 or "Delete Task"
- **Input**: Task ID (integer)
- **Output**: Success message confirming deletion
- **Error Cases**: Invalid ID returns error message
- **Validation**: Task ID must exist in current list

### Mark Task Operation
- **Command**: User selects option 5 or "Mark Task Complete/Incomplete"
- **Input**: Task ID (integer) and status ("complete" or "incomplete")
- **Output**: Success message confirming status change
- **Error Cases**: Invalid ID or invalid status returns error message
- **Validation**: Task ID must exist in current list, status must be valid

### Exit Operation
- **Command**: User selects option 6 or "Exit"
- **Input**: None
- **Output**: Application terminates gracefully
- **Error Cases**: None
- **Validation**: None required