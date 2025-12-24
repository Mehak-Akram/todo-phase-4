#!/usr/bin/env python3
"""
Todo Application - Phase I Implementation

A console-based todo application with in-memory storage.
Features: Add, View, Update, Delete, Mark Complete/Incomplete tasks.
"""

import datetime
from typing import List, Dict, Optional


class TaskManager:
    """Manages tasks in memory with CRUD operations."""

    def __init__(self):
        """Initialize the task manager with empty task list and ID counter."""
        self.tasks: List[Dict] = []
        self.next_id: int = 1

    def create_task(self, description: str) -> Dict:
        """
        Create a new task with the given description.

        Args:
            description: The task description

        Returns:
            The created task dictionary
        """
        if not description or description.strip() == "":
            raise ValueError("Task description cannot be empty")

        task = {
            "id": self.next_id,
            "description": description.strip(),
            "status": False,  # Default to incomplete
            "created_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        self.tasks.append(task)
        self.next_id += 1

        return task

    def get_all_tasks(self) -> List[Dict]:
        """
        Get all tasks.

        Returns:
            List of all task dictionaries
        """
        return self.tasks

    def get_task_by_id(self, task_id: int) -> Optional[Dict]:
        """
        Get a task by its ID.

        Args:
            task_id: The ID of the task to retrieve

        Returns:
            The task dictionary if found, None otherwise
        """
        for task in self.tasks:
            if task["id"] == task_id:
                return task
        return None

    def update_task(self, task_id: int, new_description: str) -> bool:
        """
        Update a task's description.

        Args:
            task_id: The ID of the task to update
            new_description: The new description

        Returns:
            True if task was updated, False if task not found
        """
        if not new_description or new_description.strip() == "":
            raise ValueError("Task description cannot be empty")

        for task in self.tasks:
            if task["id"] == task_id:
                task["description"] = new_description.strip()
                return True
        return False

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id: The ID of the task to delete

        Returns:
            True if task was deleted, False if task not found
        """
        for i, task in enumerate(self.tasks):
            if task["id"] == task_id:
                del self.tasks[i]
                return True
        return False

    def mark_task_status(self, task_id: int, status: bool) -> bool:
        """
        Mark a task as complete or incomplete.

        Args:
            task_id: The ID of the task to update
            status: True for complete, False for incomplete

        Returns:
            True if task status was updated, False if task not found
        """
        for task in self.tasks:
            if task["id"] == task_id:
                task["status"] = status
                return True
        return False


def display_menu():
    """Display the main menu options."""
    print("\n" + "="*40)
    print("TODO APPLICATION")
    print("="*40)
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Mark Task Complete/Incomplete")
    print("6. Exit")
    print("="*40)


def get_user_choice() -> str:
    """
    Get and validate user menu choice.

    Returns:
        The user's menu choice as a string
    """
    while True:
        try:
            choice = input("Choose an option (1-6): ").strip()
            if choice in ["1", "2", "3", "4", "5", "6"]:
                return choice
            else:
                print("Invalid choice. Please enter a number between 1 and 6.")
        except (EOFError, KeyboardInterrupt):
            print("\nExiting application...")
            return "6"


def add_task_ui(task_manager: TaskManager):
    """Handle the UI for adding a new task."""
    print("\n--- Add New Task ---")
    try:
        description = input("Enter task description: ").strip()
        if not description:
            print("Error: Task description cannot be empty.")
            return

        task = task_manager.create_task(description)
        print(f"Task added successfully with ID: {task['id']}")
    except ValueError as e:
        print(f"Error: {e}")


def view_tasks_ui(task_manager: TaskManager):
    """Handle the UI for viewing all tasks."""
    print("\n--- View Tasks ---")
    tasks = task_manager.get_all_tasks()

    if not tasks:
        print("No tasks in the list.")
        return

    print(f"{'ID':<4} | {'Status':<12} | {'Description':<20} | {'Created At':<20}")
    print("-" * 60)

    for task in tasks:
        status = "Complete" if task["status"] else "Incomplete"
        description = task["description"][:17] + "..." if len(task["description"]) > 20 else task["description"]
        print(f"{task['id']:<4} | {status:<12} | {description:<20} | {task['created_at']:<20}")


def update_task_ui(task_manager: TaskManager):
    """Handle the UI for updating a task."""
    print("\n--- Update Task ---")

    if not task_manager.get_all_tasks():
        print("No tasks available to update.")
        return

    try:
        task_id_input = input("Enter task ID to update: ").strip()
        if not task_id_input.isdigit():
            print("Error: Task ID must be a number.")
            return

        task_id = int(task_id_input)
        task = task_manager.get_task_by_id(task_id)

        if not task:
            print(f"Error: Task with ID {task_id} not found.")
            return

        new_description = input(f"Enter new description (current: '{task['description']}'): ").strip()
        if not new_description:
            print("Error: Task description cannot be empty.")
            return

        if task_manager.update_task(task_id, new_description):
            print("Task updated successfully.")
        else:
            print("Error: Task could not be updated.")
    except ValueError as e:
        print(f"Error: {e}")


def delete_task_ui(task_manager: TaskManager):
    """Handle the UI for deleting a task."""
    print("\n--- Delete Task ---")

    if not task_manager.get_all_tasks():
        print("No tasks available to delete.")
        return

    try:
        task_id_input = input("Enter task ID to delete: ").strip()
        if not task_id_input.isdigit():
            print("Error: Task ID must be a number.")
            return

        task_id = int(task_id_input)
        task = task_manager.get_task_by_id(task_id)

        if not task:
            print(f"Error: Task with ID {task_id} not found.")
            return

        confirm = input(f"Are you sure you want to delete task '{task['description']}'? (y/N): ").strip().lower()
        if confirm in ['y', 'yes']:
            if task_manager.delete_task(task_id):
                print("Task deleted successfully.")
            else:
                print("Error: Task could not be deleted.")
        else:
            print("Task deletion cancelled.")
    except ValueError:
        print("Error: Invalid input.")


def mark_task_ui(task_manager: TaskManager):
    """Handle the UI for marking a task complete/incomplete."""
    print("\n--- Mark Task Complete/Incomplete ---")

    if not task_manager.get_all_tasks():
        print("No tasks available to mark.")
        return

    try:
        task_id_input = input("Enter task ID to mark: ").strip()
        if not task_id_input.isdigit():
            print("Error: Task ID must be a number.")
            return

        task_id = int(task_id_input)
        task = task_manager.get_task_by_id(task_id)

        if not task:
            print(f"Error: Task with ID {task_id} not found.")
            return

        current_status = "Complete" if task["status"] else "Incomplete"
        new_status_input = input(f"Mark task as (c)omplete or (i)ncomplete? (current: {current_status}): ").strip().lower()

        if new_status_input in ['c', 'complete']:
            new_status = True
        elif new_status_input in ['i', 'incomplete']:
            new_status = False
        else:
            print("Invalid choice. Please enter 'c' for complete or 'i' for incomplete.")
            # Don't return here, just continue with the function
            return

        if task_manager.mark_task_status(task_id, new_status):
            status_text = "complete" if new_status else "incomplete"
            print(f"Task marked as {status_text} successfully.")
        else:
            print("Error: Task status could not be updated.")
    except ValueError:
        print("Error: Invalid input.")


def main():
    """Main application loop."""
    print("Welcome to the Todo Application!")

    task_manager = TaskManager()

    while True:
        display_menu()
        choice = get_user_choice()

        if choice == "1":
            add_task_ui(task_manager)
        elif choice == "2":
            view_tasks_ui(task_manager)
        elif choice == "3":
            update_task_ui(task_manager)
        elif choice == "4":
            delete_task_ui(task_manager)
        elif choice == "5":
            mark_task_ui(task_manager)
        elif choice == "6":
            print("Thank you for using the Todo Application. Goodbye!")
            break

        # Pause to let user see the result before showing menu again
        input("\nPress Enter to continue...")


if __name__ == "__main__":
    main()