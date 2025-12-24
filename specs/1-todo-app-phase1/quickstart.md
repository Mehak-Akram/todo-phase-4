# Quickstart Guide: Phase I - Evolution of Todo

## Running the Application

### Prerequisites
- Python 3.11 or higher installed on your system

### Execution
1. Save the application code as `todo_app.py`
2. Open a terminal/command prompt
3. Navigate to the directory containing `todo_app.py`
4. Run the application:
   ```bash
   python todo_app.py
   ```

## Using the Application

### Main Menu Options
The application presents a menu with the following options:
1. **Add Task** - Create a new task in your todo list
2. **View Tasks** - Display all tasks with their status
3. **Update Task** - Modify the description of an existing task
4. **Delete Task** - Remove a task from your list
5. **Mark Task Complete/Incomplete** - Update the completion status of a task
6. **Exit** - Quit the application

### Basic Workflow
1. Start the application to see the main menu
2. Choose option 1 to add tasks to your list
3. Use option 2 to view your current tasks
4. Use options 3-5 to manage your tasks
5. Select option 6 to exit when finished

### Example Session
```
Welcome to the Todo Application!
1. Add Task
2. View Tasks
3. Update Task
4. Delete Task
5. Mark Task Complete/Incomplete
6. Exit
Choose an option: 1
Enter task description: Buy groceries
Task added successfully with ID: 1

Choose an option: 2
ID | Status    | Description
---|-----------|------------------
1  | Incomplete| Buy groceries

Choose an option: 5
Enter task ID: 1
Enter status (complete/incomplete): complete
Task marked as complete successfully.
```

## Error Handling
- Invalid task IDs will result in an error message
- Empty task lists will display an appropriate message
- Invalid menu choices will prompt for re-entry
- Empty task descriptions will be rejected