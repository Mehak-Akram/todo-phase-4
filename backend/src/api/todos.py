from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List, Annotated
from uuid import UUID
from ..database.database import get_session
from ..models.todo import Todo, TodoCreate, TodoRead, TodoUpdate
from ..models.user import User
from ..services.todo_service import (
    get_todos_by_user,
    get_todo_by_id,
    create_todo,
    update_todo,
    delete_todo,
    toggle_todo_completion
)
from ..middleware.auth import get_current_user

router = APIRouter()


@router.get("/todos", response_model=List[TodoRead])
def read_todos(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Get all todos for the current user"""
    todos = get_todos_by_user(session, current_user.id)
    return todos

@router.post("/todos", response_model=TodoRead)
def create_todo_endpoint(
    todo: TodoCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Create a new todo for the current user"""
    db_todo = create_todo(session, todo, current_user.id)
    return db_todo

@router.put("/todos/{todo_id}", response_model=TodoRead)
def update_todo_endpoint(
    todo_id: UUID,
    todo_update: TodoUpdate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Update an existing todo for the current user"""
    db_todo = update_todo(session, todo_id, todo_update, current_user.id)
    if not db_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return db_todo

@router.delete("/todos/{todo_id}")
def delete_todo_endpoint(
    todo_id: UUID,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Delete a todo for the current user"""
    success = delete_todo(session, todo_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return {"message": "Todo deleted successfully"}

@router.patch("/todos/{todo_id}/complete", response_model=TodoRead)
def toggle_todo_complete(
    todo_id: UUID,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Toggle completion status of a todo for the current user"""
    db_todo = toggle_todo_completion(session, todo_id, current_user.id)
    if not db_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return db_todo