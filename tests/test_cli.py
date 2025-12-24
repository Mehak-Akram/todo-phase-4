"""
Integration tests for the Todo Application CLI interface.
Tests the user interaction flow and menu options.
"""
import pytest
import sys
import os
from unittest.mock import patch, MagicMock
from io import StringIO

# Add the parent directory to the path to import todo_app
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from todo_app import (
    display_menu, get_user_choice, add_task_ui, view_tasks_ui,
    update_task_ui, delete_task_ui, mark_task_ui, main, TaskManager
)


def test_display_menu():
    """Test that the menu displays correctly."""
    # Capture the output
    captured_output = StringIO()

    # We can't easily test print output without patching, so we'll just ensure it runs
    try:
        display_menu()
    except Exception:
        pytest.fail("display_menu() raised an exception")


@patch('builtins.input', side_effect=['1'])
def test_get_user_choice_valid(mock_input):
    """Test getting a valid user choice."""
    choice = get_user_choice()
    assert choice == '1'


@patch('builtins.input', side_effect=['7', '1'])  # Invalid then valid
def test_get_user_choice_invalid_then_valid(mock_input):
    """Test getting an invalid choice followed by a valid one."""
    choice = get_user_choice()
    assert choice == '1'


@patch('builtins.input', side_effect=['invalid', '2'])
def test_get_user_choice_invalid_input(mock_input):
    """Test getting an invalid input followed by a valid one."""
    choice = get_user_choice()
    assert choice == '2'


def test_add_task_ui():
    """Test the add task UI function."""
    tm = TaskManager()

    # Mock user input
    with patch('builtins.input', side_effect=['Test task description']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            add_task_ui(tm)

            # Check that the task was added
            assert len(tm.tasks) == 1
            assert tm.tasks[0]["description"] == "Test task description"
            assert tm.tasks[0]["status"] is False

            # Check that success message was printed
            output = mock_stdout.getvalue()
            assert "Task added successfully" in output


def test_add_task_ui_empty_description():
    """Test adding a task with empty description."""
    tm = TaskManager()

    # Mock user input with empty description
    with patch('builtins.input', side_effect=['']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            add_task_ui(tm)

            # Check that no task was added
            assert len(tm.tasks) == 0

            # Check that error message was printed
            output = mock_stdout.getvalue()
            assert "Error: Task description cannot be empty" in output


def test_view_tasks_ui_empty():
    """Test viewing tasks when the list is empty."""
    tm = TaskManager()

    with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
        view_tasks_ui(tm)

        # Check that empty list message was printed
        output = mock_stdout.getvalue()
        assert "No tasks in the list" in output


def test_view_tasks_ui_with_tasks():
    """Test viewing tasks when the list has tasks."""
    tm = TaskManager()
    tm.create_task("Task 1")
    tm.create_task("Task 2")

    with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
        view_tasks_ui(tm)

        # Check that tasks were displayed
        output = mock_stdout.getvalue()
        assert "Task 1" in output
        assert "Task 2" in output
        assert "Incomplete" in output


def test_update_task_ui():
    """Test updating a task."""
    tm = TaskManager()
    tm.create_task("Original task")

    # Mock user input: task ID and new description
    with patch('builtins.input', side_effect=['1', 'Updated task']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            update_task_ui(tm)

            # Check that the task was updated
            assert len(tm.tasks) == 1
            assert tm.tasks[0]["description"] == "Updated task"

            # Check that success message was printed
            output = mock_stdout.getvalue()
            assert "Task updated successfully" in output


def test_update_task_ui_invalid_id():
    """Test updating a task with invalid ID."""
    tm = TaskManager()
    tm.create_task("Original task")

    # Mock user input: invalid task ID
    with patch('builtins.input', side_effect=['999']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            update_task_ui(tm)

            # Check that task was not updated
            assert tm.tasks[0]["description"] == "Original task"

            # Check that error message was printed
            output = mock_stdout.getvalue()
            assert "not found" in output


def test_update_task_ui_empty_description():
    """Test updating a task with empty description."""
    tm = TaskManager()
    tm.create_task("Original task")

    # Mock user input: task ID and empty description
    with patch('builtins.input', side_effect=['1', '']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            update_task_ui(tm)

            # Check that task was not updated
            assert tm.tasks[0]["description"] == "Original task"

            # Check that error message was printed
            output = mock_stdout.getvalue()
            assert "Error: Task description cannot be empty" in output


def test_delete_task_ui():
    """Test deleting a task."""
    tm = TaskManager()
    tm.create_task("Task to delete")
    tm.create_task("Another task")

    # Mock user input: task ID and confirmation
    with patch('builtins.input', side_effect=['1', 'y']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            delete_task_ui(tm)

            # Check that the task was deleted
            assert len(tm.tasks) == 1
            assert tm.tasks[0]["description"] == "Another task"

            # Check that success message was printed
            output = mock_stdout.getvalue()
            assert "Task deleted successfully" in output


def test_delete_task_ui_cancel():
    """Test deleting a task but cancelling."""
    tm = TaskManager()
    tm.create_task("Task to delete")

    # Mock user input: task ID and cancellation
    with patch('builtins.input', side_effect=['1', 'n']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            delete_task_ui(tm)

            # Check that the task was not deleted
            assert len(tm.tasks) == 1
            assert tm.tasks[0]["description"] == "Task to delete"

            # Check that cancellation message was printed
            output = mock_stdout.getvalue()
            assert "Task deletion cancelled" in output


def test_delete_task_ui_invalid_id():
    """Test deleting a task with invalid ID."""
    tm = TaskManager()
    tm.create_task("Existing task")

    # Mock user input: invalid task ID
    with patch('builtins.input', side_effect=['999']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            delete_task_ui(tm)

            # Check that no task was deleted
            assert len(tm.tasks) == 1

            # Check that error message was printed
            output = mock_stdout.getvalue()
            assert "not found" in output


def test_mark_task_ui_complete():
    """Test marking a task as complete."""
    tm = TaskManager()
    tm.create_task("Task to mark")

    # Mock user input: task ID and 'complete'
    with patch('builtins.input', side_effect=['1', 'c']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            mark_task_ui(tm)

            # Check that the task status was updated
            assert tm.tasks[0]["status"] is True

            # Check that success message was printed
            output = mock_stdout.getvalue()
            assert "marked as complete" in output


def test_mark_task_ui_incomplete():
    """Test marking a task as incomplete."""
    tm = TaskManager()
    tm.create_task("Task to mark")

    # Mark as complete first
    tm.mark_task_status(1, True)
    assert tm.tasks[0]["status"] is True

    # Mock user input: task ID and 'incomplete'
    with patch('builtins.input', side_effect=['1', 'i']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            mark_task_ui(tm)

            # Check that the task status was updated
            assert tm.tasks[0]["status"] is False

            # Check that success message was printed
            output = mock_stdout.getvalue()
            assert "marked as incomplete" in output


def test_mark_task_ui_invalid_id():
    """Test marking a task with invalid ID."""
    tm = TaskManager()
    tm.create_task("Existing task")

    # Mock user input: invalid task ID
    with patch('builtins.input', side_effect=['999']):
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            mark_task_ui(tm)

            # Check that no task status was changed
            assert tm.tasks[0]["status"] is False

            # Check that error message was printed
            output = mock_stdout.getvalue()
            assert "not found" in output


def test_mark_task_ui_invalid_choice():
    """Test marking a task with invalid status choice."""
    tm = TaskManager()
    tm.create_task("Task to mark")

    # Mock user input: task ID and invalid choice
    with patch('builtins.input', side_effect=['1', 'x']):  # Invalid choice only
        with patch('sys.stdout', new_callable=StringIO) as mock_stdout:
            mark_task_ui(tm)

            # Check that the task status was not changed (function exits after invalid input)
            assert tm.tasks[0]["status"] is False

            # Check that error message was printed
            output = mock_stdout.getvalue()
            assert "Invalid choice" in output


def test_main_function_flow():
    """Test the main function flow with exit command."""
    # Mock user input to exit immediately
    with patch('builtins.input', side_effect=['6']), \
         patch('sys.stdout', new_callable=StringIO):
        # This should exit without errors
        main()


if __name__ == "__main__":
    pytest.main([__file__])