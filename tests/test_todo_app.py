"""
Unit tests for the Todo Application TaskManager class.
Tests the core functionality without UI components.
"""
import pytest
from datetime import datetime
import sys
import os

# Add the parent directory to the path to import todo_app
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from todo_app import TaskManager


def test_task_manager_initialization():
    """Test that TaskManager initializes with empty tasks and ID counter at 1."""
    tm = TaskManager()
    assert tm.tasks == []
    assert tm.next_id == 1


def test_create_task():
    """Test creating a new task."""
    tm = TaskManager()
    task = tm.create_task("Test task description")

    assert len(tm.tasks) == 1
    assert task["id"] == 1
    assert task["description"] == "Test task description"
    assert task["status"] is False
    assert "created_at" in task
    assert isinstance(task["created_at"], str)

    # Check that the next ID is incremented
    assert tm.next_id == 2


def test_create_task_with_whitespace():
    """Test that task description is stripped of leading/trailing whitespace."""
    tm = TaskManager()
    task = tm.create_task("  Test task with spaces  ")

    assert task["description"] == "Test task with spaces"


def test_create_task_empty_description():
    """Test that creating a task with empty description raises ValueError."""
    tm = TaskManager()

    with pytest.raises(ValueError, match="Task description cannot be empty"):
        tm.create_task("")

    with pytest.raises(ValueError, match="Task description cannot be empty"):
        tm.create_task("   ")

    with pytest.raises(ValueError, match="Task description cannot be empty"):
        tm.create_task("\t\n")


def test_get_all_tasks():
    """Test getting all tasks."""
    tm = TaskManager()
    assert tm.get_all_tasks() == []

    tm.create_task("Task 1")
    tm.create_task("Task 2")

    all_tasks = tm.get_all_tasks()
    assert len(all_tasks) == 2
    assert all_tasks[0]["id"] == 1
    assert all_tasks[1]["id"] == 2


def test_get_task_by_id():
    """Test getting a task by its ID."""
    tm = TaskManager()
    tm.create_task("Task 1")
    tm.create_task("Task 2")

    # Test getting existing task
    task = tm.get_task_by_id(1)
    assert task is not None
    assert task["id"] == 1
    assert task["description"] == "Task 1"

    # Test getting non-existing task
    task = tm.get_task_by_id(999)
    assert task is None

    # Test getting task with ID that was never assigned
    task = tm.get_task_by_id(0)
    assert task is None


def test_update_task():
    """Test updating a task's description."""
    tm = TaskManager()
    tm.create_task("Original description")

    # Test successful update
    result = tm.update_task(1, "Updated description")
    assert result is True

    task = tm.get_task_by_id(1)
    assert task["description"] == "Updated description"

    # Test updating non-existing task
    result = tm.update_task(999, "Another description")
    assert result is False


def test_update_task_empty_description():
    """Test that updating a task with empty description raises ValueError."""
    tm = TaskManager()
    tm.create_task("Original description")

    with pytest.raises(ValueError, match="Task description cannot be empty"):
        tm.update_task(1, "")

    with pytest.raises(ValueError, match="Task description cannot be empty"):
        tm.update_task(1, "   ")


def test_delete_task():
    """Test deleting a task."""
    tm = TaskManager()
    tm.create_task("Task 1")
    tm.create_task("Task 2")
    tm.create_task("Task 3")

    # Test successful deletion
    result = tm.delete_task(2)
    assert result is True
    assert len(tm.tasks) == 2

    # Verify the remaining tasks are correct
    remaining_ids = [task["id"] for task in tm.tasks]
    assert 1 in remaining_ids
    assert 3 in remaining_ids
    assert 2 not in remaining_ids

    # Test deleting non-existing task
    result = tm.delete_task(999)
    assert result is False
    assert len(tm.tasks) == 2  # No change


def test_mark_task_status():
    """Test marking a task as complete/incomplete."""
    tm = TaskManager()
    tm.create_task("Task 1")

    # Test marking as complete
    result = tm.mark_task_status(1, True)
    assert result is True

    task = tm.get_task_by_id(1)
    assert task["status"] is True

    # Test marking as incomplete
    result = tm.mark_task_status(1, False)
    assert result is True

    task = tm.get_task_by_id(1)
    assert task["status"] is False

    # Test marking non-existing task
    result = tm.mark_task_status(999, True)
    assert result is False


def test_multiple_tasks_unique_ids():
    """Test that multiple tasks have unique IDs."""
    tm = TaskManager()
    tm.create_task("Task 1")
    tm.create_task("Task 2")
    tm.create_task("Task 3")

    task_ids = [task["id"] for task in tm.tasks]
    assert task_ids == [1, 2, 3]
    assert len(set(task_ids)) == len(task_ids)  # All IDs are unique


def test_task_created_at_format():
    """Test that created_at timestamp is properly formatted."""
    tm = TaskManager()
    task = tm.create_task("Test task")

    # Verify the format is roughly correct (YYYY-MM-DD HH:MM:SS)
    created_at = task["created_at"]
    assert len(created_at) == 19  # Length of "YYYY-MM-DD HH:MM:SS"
    assert created_at[4] == '-' and created_at[7] == '-'  # Date separators
    assert created_at[10] == ' '  # Date/time separator
    assert created_at[13] == ':' and created_at[16] == ':'  # Time separators


if __name__ == "__main__":
    pytest.main([__file__])